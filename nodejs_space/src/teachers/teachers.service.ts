import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { Prisma, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { requireAcademicYearId } from '../common/active-academic-year';

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

  private async safeFileUrl(fileId: string | null) {
    return this.uploadService.getFileUrlByFileId(fileId);
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
        email: t.user.email,
        isActive: t.isActive,
        dob: t.dob ? t.dob.toISOString() : null,
        age: this.calculateAge(t.dob),
        contactNumber: t.contactNumber,
        remarks: t.remarks,
        photoFileId: t.photoFileId,
        photoUrl: await this.safeFileUrl(t.photoFileId),
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
    if (!teacher) throw new NotFoundException('Teacher not found');

    const totalSessions = teacher.attendance.length;
    const present = teacher.attendance.filter(
      (a) => a.status === 'PRESENT',
    ).length;
    const absent = teacher.attendance.filter(
      (a) => a.status === 'ABSENT',
    ).length;

    const yearMap = new Map<
      string,
      {
        academicYearId: string;
        academicYearName: string;
        startDate: Date;
        classes: any[];
      }
    >();
    for (const a of teacher.assignments) {
      const yearId = a.academicYearId;
      if (!yearMap.has(yearId)) {
        yearMap.set(yearId, {
          academicYearId: yearId,
          academicYearName: a.academicYear.name,
          startDate: a.academicYear.startDate,
          classes: [],
        });
      }
      yearMap.get(yearId)!.classes.push({
        id: a.class.id,
        name: a.class.name,
        grade: a.class.grade,
      });
    }
    const teachingHistory = Array.from(yearMap.values())
      .sort((a, b) => b.startDate.getTime() - a.startDate.getTime())
      .map((y) => ({
        academicYearId: y.academicYearId,
        academicYearName: y.academicYearName,
        classes: y.classes,
      }));

    return {
      id: teacher.id,
      userId: teacher.userId,
      name: teacher.name,
      nickname: teacher.nickname,
      email: teacher.user.email,
      isActive: teacher.isActive,
      dob: teacher.dob ? teacher.dob.toISOString() : null,
      age: this.calculateAge(teacher.dob),
      contactNumber: teacher.contactNumber,
      remarks: teacher.remarks,
      photoFileId: teacher.photoFileId,
      photoUrl: await this.safeFileUrl(teacher.photoFileId),
      assignedClasses: teacher.assignments.map((a) => ({
        id: a.class.id,
        name: a.class.name,
        grade: a.class.grade,
      })),
      assignedClassIds: teacher.assignments.map((a) => a.class.id),
      teachingHistory,
      attendanceSummary: {
        totalSessions,
        present,
        absent,
        percentage:
          totalSessions > 0 ? Math.round((present / totalSessions) * 100) : 0,
      },
      createdAt: teacher.createdAt.toISOString(),
    };
  }

  async create(data: {
    name: string;
    nickname?: string | null;
    email?: string | null;
    password?: string | null;
    dob?: string | null;
    contactNumber?: string | null;
    remarks?: string | null;
    photoFileId?: string | null;
    isActive?: boolean;
    classIds?: string[];
  }) {
    let email = data.email?.trim() || undefined;
    let password = data.password?.trim() || undefined;

    if (!email) {
      const base = (data.name || 'teacher')
        .toLowerCase()
        .replace(/\s+/g, '.')
        .replace(/[^a-z0-9.]/g, '');
      const candidate = `${base}.${Date.now()}@noemail.local`;
      email = candidate;
    }
    if (!password) {
      password = `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
    }

    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashed,
        name: data.name,
        role: UserRole.TEACHER,
      },
    });

    const academicYearId = data.classIds?.length
      ? await requireAcademicYearId(this.prisma)
      : undefined;
    const teacher = await this.prisma.teacher.create({
      data: {
        userId: user.id,
        name: data.name,
        nickname: data.nickname ?? null,
        isActive: data.isActive ?? true,
        dob: data.dob ? new Date(data.dob) : null,
        contactNumber: data.contactNumber ?? null,
        remarks: data.remarks ?? null,
        photoFileId: data.photoFileId ?? null,
        assignments: data.classIds?.length
          ? {
              create: data.classIds.map((cid) => ({
                classId: cid,
                academicYearId: academicYearId!,
              })),
            }
          : undefined,
      },
    });
    return this.findOne(teacher.id);
  }

  async update(
    id: string,
    data: {
      name?: string;
      nickname?: string | null;
      email?: string | null;
      password?: string | null;
      dob?: string | null;
      contactNumber?: string | null;
      remarks?: string | null;
      photoFileId?: string | null;
      isActive?: boolean;
      classIds?: string[];
    },
  ) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id },
      include: { user: true, assignments: true },
    });
    if (!teacher) throw new NotFoundException('Teacher not found');

    const dataToUpdate: Prisma.TeacherUncheckedUpdateInput = {};
    if (data.name !== undefined) dataToUpdate.name = data.name;
    if (data.nickname !== undefined) dataToUpdate.nickname = data.nickname;
    if (data.isActive !== undefined) dataToUpdate.isActive = data.isActive;
    if (data.dob !== undefined)
      dataToUpdate.dob = data.dob ? new Date(data.dob) : null;
    if (data.contactNumber !== undefined)
      dataToUpdate.contactNumber = data.contactNumber;
    if (data.remarks !== undefined) dataToUpdate.remarks = data.remarks;
    if (data.photoFileId !== undefined)
      dataToUpdate.photoFileId = data.photoFileId;

    await this.prisma.teacher.update({ where: { id }, data: dataToUpdate });

    // Login credentials editing (Email / Username + Password)
    const userData: Prisma.UserUpdateInput = {};
    if (data.email && data.email !== teacher.user.email) {
      const existing = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (existing && existing.id !== teacher.userId) {
        throw new ConflictException('Email already in use');
      }
      userData.email = data.email;
    }
    if (data.password) {
      userData.password = await bcrypt.hash(data.password, 10);
    }
    if (Object.keys(userData).length > 0) {
      await this.prisma.user.update({
        where: { id: teacher.userId },
        data: userData,
      });
    }

    // Sync class assignments for the active academic year when classIds is provided
    if (data.classIds !== undefined) {
      const academicYearId = await requireAcademicYearId(this.prisma);
      const newIds = new Set(data.classIds);
      const current = teacher.assignments.filter(
        (a) => a.academicYearId === academicYearId,
      );
      // remove assignments no longer selected
      const toRemove = current.filter((a) => !newIds.has(a.classId));
      if (toRemove.length > 0) {
        await this.prisma.teacherAssignment.deleteMany({
          where: { id: { in: toRemove.map((a) => a.id) } },
        });
      }
      // add newly selected
      const toAdd = [...newIds].filter(
        (cid) => !current.some((a) => a.classId === cid),
      );
      if (toAdd.length > 0) {
        await this.prisma.teacherAssignment.createMany({
          data: toAdd.map((classId) => ({
            teacherId: id,
            classId,
            academicYearId,
          })),
          skipDuplicates: true,
        });
      }
    }

    return this.findOne(id);
  }

  async setActive(id: string, isActive: boolean) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new NotFoundException('Teacher not found');
    await this.prisma.teacher.update({ where: { id }, data: { isActive } });
    return this.findOne(id);
  }

  async remove(id: string) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new NotFoundException('Teacher not found');
    await this.prisma.teacher.delete({ where: { id } });
    await this.prisma.user.delete({ where: { id: teacher.userId } });
    return { success: true };
  }

  async findAvailableByClass(classId: string, academicYearId?: string) {
    const yearId = await requireAcademicYearId(
      this.prisma,
      academicYearId,
    ).catch(() => null);
    const assignedIds = yearId
      ? (
          await this.prisma.teacherAssignment.findMany({
            where: { classId, academicYearId: yearId },
            select: { teacherId: true },
          })
        ).map((a) => a.teacherId)
      : [];
    const teachers = await this.prisma.teacher.findMany({
      where: {
        isActive: true,
        ...(assignedIds.length ? { id: { notIn: assignedIds } } : {}),
      },
      include: { user: true },
      orderBy: { name: 'asc' },
    });
    return teachers.map((t) => ({
      id: t.id,
      userId: t.userId,
      name: t.name,
      nickname: t.nickname,
      isActive: t.isActive,
      photoFileId: t.photoFileId,
      photoUrl: null as string | null,
    }));
  }
}
