import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';

@Injectable()
export class TeachersService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  private calculateAge(dob: Date): number {
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
        dob: t.dob.toISOString(),
        age: this.calculateAge(t.dob),
        contactNumber: t.contactNumber,
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
        attendance: { include: { classSession: true } },
      },
    });
    if (!teacher) throw new NotFoundException('Teacher not found');

    const totalSessions = teacher.attendance.length;
    const present = teacher.attendance.filter((a) => a.status === 'PRESENT').length;
    const absent = teacher.attendance.filter((a) => a.status === 'ABSENT').length;

    return {
      id: teacher.id,
      userId: teacher.userId,
      name: teacher.name,
      dob: teacher.dob.toISOString(),
      age: this.calculateAge(teacher.dob),
      contactNumber: teacher.contactNumber,
      photoFileId: teacher.photoFileId,
      photoUrl: await this.uploadService.getFileUrlByFileId(teacher.photoFileId),
      assignedClasses: teacher.assignments.map((a) => ({
        id: a.class.id,
        name: a.class.name,
        grade: a.class.grade,
      })),
      attendanceSummary: {
        totalSessions,
        present,
        absent,
        percentage: totalSessions > 0 ? Math.round((present / totalSessions) * 100) : 0,
      },
      createdAt: teacher.createdAt.toISOString(),
    };
  }

  async create(data: {
    email: string;
    password: string;
    name: string;
    dob: string;
    contactNumber: string;
    photoFileId?: string | null;
    classIds?: string[];
  }) {
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashed,
        name: data.name,
        role: UserRole.TEACHER,
      },
    });
    const teacher = await this.prisma.teacher.create({
      data: {
        userId: user.id,
        name: data.name,
        dob: new Date(data.dob),
        contactNumber: data.contactNumber,
        photoFileId: data.photoFileId ?? null,
        assignments: data.classIds?.length
          ? { create: data.classIds.map((cid) => ({ classId: cid })) }
          : undefined,
      },
    });
    return this.findOne(teacher.id);
  }

  async update(id: string, data: {
    name?: string;
    dob?: string;
    contactNumber?: string;
    photoFileId?: string | null;
  }) {
    await this.prisma.teacher.update({
      where: { id },
      data: {
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.dob !== undefined ? { dob: new Date(data.dob) } : {}),
        ...(data.contactNumber !== undefined ? { contactNumber: data.contactNumber } : {}),
        ...(data.photoFileId !== undefined ? { photoFileId: data.photoFileId } : {}),
      },
    });
    return this.findOne(id);
  }

  async remove(id: string) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new NotFoundException('Teacher not found');
    await this.prisma.teacher.delete({ where: { id } });
    await this.prisma.user.delete({ where: { id: teacher.userId } });
    return { success: true };
  }
}
