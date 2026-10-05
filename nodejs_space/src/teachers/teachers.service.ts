import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';

@Injectable()
export class TeachersService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  private calculateAge(dob: Date | null): number | null {
    if (!dob) return null;
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    return age;
  }

  async findAll() {
    const teachers = await this.prisma.teacher.findMany({
      include: {
        user: true,
        assignments: { include: { class: true } },
      },
      orderBy: { name: 'asc' },
    });

    return Promise.all(
      teachers.map(async (t) => ({
        id: t.id,
        userId: t.userId,
        name: t.name,
        nickname: t.nickname,
        gelar: t.gelar,
        alamat: t.alamat,
        isActive: t.isActive,
        email: t.user.email,
        dob: t.dob ? t.dob.toISOString() : null,
        age: this.calculateAge(t.dob),
        contactNumber: t.contactNumber,
        remarks: t.remarks,
        photoFileId: t.photoFileId,
        photoUrl: await this.uploadService.getFileUrlByFileId(t.photoFileId),
        assignedClasses: t.assignments.map((a) => ({
          id: a.class.id,
          name: a.class.name,
          grade: a.class.grade,
        })),
      })),
    );
  }

  async findOne(id: string) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id },
      include: {
        user: true,
        assignments: { include: { class: true, academicYear: true } },
        attendance: { include: { classSession: true } },
      },
    });

    if (!teacher) throw new NotFoundException('Guru tidak ditemukan');

    const totalSessions = teacher.attendance.length;
    const presentCount = teacher.attendance.filter((a) => a.status === 'PRESENT').length;
    const absentCount = teacher.attendance.filter((a) => a.status === 'ABSENT').length;

    return {
      id: teacher.id,
      userId: teacher.userId,
      name: teacher.name,
      nickname: teacher.nickname,
      gelar: teacher.gelar,
      alamat: teacher.alamat,
      email: teacher.user.email,
      isActive: teacher.isActive,
      dob: teacher.dob ? teacher.dob.toISOString() : null,
      age: this.calculateAge(teacher.dob),
      contactNumber: teacher.contactNumber,
      remarks: teacher.remarks,
      photoFileId: teacher.photoFileId,
      photoUrl: await this.uploadService.getFileUrlByFileId(teacher.photoFileId),
      assignedClasses: teacher.assignments.map((a) => ({
        id: a.class.id,
        name: a.class.name,
        grade: a.class.grade,
      })),
      assignedClassIds: teacher.assignments.map((a) => a.classId),
      teachingHistory: [],
      attendanceSummary: {
        totalSessions,
        present: presentCount,
        absent: absentCount,
        percentage: totalSessions > 0 ? Math.round((presentCount / totalSessions) * 100) : 0,
      },
      createdAt: teacher.createdAt.toISOString(),
    };
  }

  async create(dto: CreateTeacherDto) {
    const email = dto.email || `teacher_${Date.now()}@school.internal`;
    const password = dto.password || 'password123';
    const name = dto.name?.trim() || null;
    const userName = name || dto.nickname?.trim() || email.split('@')[0] || 'Teacher';

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new ConflictException('Email sudah digunakan');

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacherId = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name: userName,
          role: UserRole.TEACHER,
          isActive: dto.isActive ?? true,
        },
      });

      const teacher = await tx.teacher.create({
        data: {
          userId: user.id,
          name,
          nickname: dto.nickname || null,
          gelar: dto.gelar || null,
          alamat: dto.alamat || null,
          isActive: dto.isActive ?? true,
          dob: dto.dob ? new Date(dto.dob) : null,
          contactNumber: dto.contactNumber || null,
          remarks: dto.remarks || null,
          photoFileId: dto.photoFileId || null,
        },
      });

      if (dto.classIds?.length) {
        const activeYear = await tx.academicYear.findFirst({ where: { isActive: true } });
        if (activeYear) {
          await tx.teacherAssignment.createMany({
            data: dto.classIds.map((classId) => ({
              teacherId: teacher.id,
              classId,
              academicYearId: activeYear.id,
            })),
          });
        }
      }

      return teacher.id;
    });

    return this.findOne(teacherId);
  }

  async update(id: string, dto: UpdateTeacherDto) {
    await this.prisma.$transaction(async (tx) => {
      const teacher = await tx.teacher.findUnique({ where: { id }, include: { user: true } });
      if (!teacher) throw new NotFoundException('Guru tidak ditemukan');

      if (dto.email || dto.password || dto.name !== undefined || dto.nickname !== undefined) {
        const userUpdateData: { email?: string; password?: string; name?: string } = {};
        if (dto.email) {
          const emailExists = await tx.user.findFirst({
            where: { email: dto.email, NOT: { id: teacher.userId } },
          });
          if (emailExists) throw new ConflictException('Email sudah digunakan oleh pengguna lain');
          userUpdateData.email = dto.email;
        }
        if (dto.password) userUpdateData.password = await bcrypt.hash(dto.password, 10);
        if (dto.name !== undefined || dto.nickname !== undefined) {
          userUpdateData.name =
            dto.name?.trim() ||
            (dto.nickname !== undefined ? dto.nickname.trim() : teacher.nickname?.trim()) ||
            (dto.email || teacher.user.email).split('@')[0] ||
            'Teacher';
        }
        if (Object.keys(userUpdateData).length) {
          await tx.user.update({ where: { id: teacher.userId }, data: userUpdateData });
        }
      }

      if (dto.isActive !== undefined) {
        await tx.user.update({
          where: { id: teacher.userId },
          data: { isActive: dto.isActive },
        });
      }

      await tx.teacher.update({
        where: { id },
        data: {
          ...(dto.name !== undefined && { name: dto.name?.trim() || null }),
          ...(dto.nickname !== undefined && { nickname: dto.nickname }),
          ...(dto.gelar !== undefined && { gelar: dto.gelar?.trim() || null }),
          ...(dto.alamat !== undefined && { alamat: dto.alamat?.trim() || null }),
          ...(dto.isActive !== undefined && { isActive: dto.isActive }),
          ...(dto.dob !== undefined && { dob: dto.dob ? new Date(dto.dob) : null }),
          ...(dto.contactNumber !== undefined && { contactNumber: dto.contactNumber }),
          ...(dto.remarks !== undefined && { remarks: dto.remarks }),
          ...(dto.photoFileId !== undefined && { photoFileId: dto.photoFileId }),
        },
      });

      if (dto.classIds !== undefined) {
        const activeYear = await tx.academicYear.findFirst({ where: { isActive: true } });
        if (activeYear) {
          await tx.teacherAssignment.deleteMany({
            where: { teacherId: id, academicYearId: activeYear.id },
          });
          if (dto.classIds.length) {
            await tx.teacherAssignment.createMany({
              data: dto.classIds.map((classId) => ({
                teacherId: id,
                classId,
                academicYearId: activeYear.id,
              })),
            });
          }
        }
      }
    });

    return this.findOne(id);
  }

  async setActive(id: string, isActive: boolean) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new NotFoundException('Guru tidak ditemukan');

    await this.prisma.$transaction([
      this.prisma.teacher.update({ where: { id }, data: { isActive } }),
      this.prisma.user.update({ where: { id: teacher.userId }, data: { isActive } }),
    ]);

    return this.findOne(id);
  }

  async remove(id: string) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new NotFoundException('Guru tidak ditemukan');

    await this.prisma.user.delete({ where: { id: teacher.userId } });
    return { success: true };
  }
}