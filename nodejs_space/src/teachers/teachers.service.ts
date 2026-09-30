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
        assignments: { include: { class: true } },
        attendance: true,
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
      email: teacher.user.email,
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

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new ConflictException('Email sudah terdaftar');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: dto.name,
        role: UserRole.TEACHER,
      },
    });

    const teacher = await this.prisma.teacher.create({
      data: {
        userId: user.id,
        name: dto.name,
        dob: dto.dob ? new Date(dto.dob) : null,
        contactNumber: dto.contactNumber || null,
        remarks: dto.remarks || null,
        photoFileId: dto.photoFileId || null,
      },
    });

    if (dto.classIds && dto.classIds.length > 0) {
      const activeYear = await this.prisma.academicYear.findFirst({ where: { isActive: true } });
      if (activeYear) {
        await this.prisma.teacherAssignment.createMany({
          data: dto.classIds.map((classId) => ({
            teacherId: teacher.id,
            classId,
            academicYearId: activeYear.id,
          })),
        });
      }
    }

    return this.findOne(teacher.id);
  }

  async update(id: string, dto: UpdateTeacherDto) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new NotFoundException('Guru tidak ditemukan');

    // Update data akun login pada tabel User jika ada
    if (dto.email || dto.password || dto.name) {
      const userUpdateData: { email?: string; password?: string; name?: string } = {};
      if (dto.name) userUpdateData.name = dto.name;
      if (dto.email) {
        const emailExists = await this.prisma.user.findFirst({
          where: { email: dto.email, NOT: { id: teacher.userId } },
        });
        if (emailExists) throw new ConflictException('Email sudah digunakan');
        userUpdateData.email = dto.email;
      }
      if (dto.password) {
        userUpdateData.password = await bcrypt.hash(dto.password, 10);
      }
      await this.prisma.user.update({
        where: { id: teacher.userId },
        data: userUpdateData,
      });
    }

    // Update profil pada tabel Teacher
    await this.prisma.teacher.update({
      where: { id },
      data: {
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.dob !== undefined && { dob: dto.dob ? new Date(dto.dob) : null }),
        ...(dto.contactNumber !== undefined && { contactNumber: dto.contactNumber }),
        ...(dto.remarks !== undefined && { remarks: dto.remarks }),
        ...(dto.photoFileId !== undefined && { photoFileId: dto.photoFileId }),
      },
    });

    // Update penugasan kelas jika dikirimkan
    if (dto.classIds !== undefined) {
      const activeYear = await this.prisma.academicYear.findFirst({ where: { isActive: true } });
      if (activeYear) {
        await this.prisma.teacherAssignment.deleteMany({
          where: { teacherId: id, academicYearId: activeYear.id },
        });
        if (dto.classIds.length > 0) {
          await this.prisma.teacherAssignment.createMany({
            data: dto.classIds.map((classId) => ({
              teacherId: id,
              classId,
              academicYearId: activeYear.id,
            })),
          });
        }
      }
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new NotFoundException('Guru tidak ditemukan');

    await this.prisma.user.delete({ where: { id: teacher.userId } });
    return { success: true };
  }
}