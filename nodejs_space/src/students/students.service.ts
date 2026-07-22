import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { Prisma } from '@prisma/client';
import { requireAcademicYearId } from '../common/active-academic-year';

@Injectable()
export class StudentsService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) { }

  private calculateAge(dob: Date): number {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    return age;
  }

  async findAll(
    search?: string,
    classId?: string,
    page = 1,
    limit = 20,
    teacherClassIds?: string[],
  ) {
    const where: Prisma.StudentWhereInput = {};
    const activeYearId = await requireAcademicYearId(this.prisma).catch(() => null);
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { nickname: { contains: search, mode: 'insensitive' } },
        { parentName: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (classId) {
      where.enrollments = { some: { classId, status: 'ACTIVE', ...(activeYearId ? { academicYearId: activeYearId } : {}) } };
    }
    if (teacherClassIds) {
      where.enrollments = { some: { classId: { in: teacherClassIds }, status: 'ACTIVE', ...(activeYearId ? { academicYearId: activeYearId } : {}) } };
    }

    const [items, total] = await Promise.all([
      this.prisma.student.findMany({
        where,
        include: {
          enrollments: {
            include: { class: true },
            where: activeYearId ? { status: 'ACTIVE', academicYearId: activeYearId } : { status: 'ACTIVE' },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { name: 'asc' },
      }),
      this.prisma.student.count({ where }),
    ]);

    const mappedItems = await Promise.all(
      items.map(async (s) => ({
        id: s.id,
        name: s.name,
        nickname: s.nickname,
        parentName: s.parentName,
        dob: s.dob.toISOString(),
        age: this.calculateAge(s.dob),
        contactNumber: s.contactNumber,
        photoFileId: s.photoFileId,
        photoUrl: await this.uploadService.getFileUrlByFileId(s.photoFileId),
        enrolledClasses: s.enrollments.map((e) => ({
          id: e.class.id,
          name: e.class.name,
          grade: e.class.grade,
        })),
      })),
    );

    return {
      items: mappedItems,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const student = await this.prisma.student.findUnique({
      where: { id },
      include: {
        enrollments: { include: { class: true, academicYear: true }, orderBy: { academicYear: { startDate: 'desc' } } },
        attendance: {
          include: { classSession: { include: { class: true } } },
          orderBy: { classSession: { date: 'desc' } },
        },
        progress: {
          include: {
            progressMetric: { include: { class: true } },
            classSession: true,
          },
          orderBy: { classSession: { date: 'asc' } },
        },
        feedback: {
          where: { type: 'STUDENT_SPECIFIC' },
          include: {
            classSession: { include: { class: true } },
            teacher: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
        classHistory: {
          include: { class: true, academicYear: true },
          orderBy: { date: 'desc' },
        },
      },
    });
    if (!student) throw new NotFoundException('Student not found');

    const photoUrl = await this.uploadService.getFileUrlByFileId(student.photoFileId);

    // Attendance summary
    const totalSessions = student.attendance.length;
    const present = student.attendance.filter((a) => a.status === 'PRESENT').length;
    const absent = student.attendance.filter((a) => a.status === 'ABSENT').length;
    const unsure = student.attendance.filter((a) => a.status === 'UNSURE').length;

    // Per-class breakdown
    const classMap = new Map<string, { classId: string; className: string; present: number; total: number }>();
    for (const a of student.attendance) {
      const cid = a.classSession.classId;
      if (!classMap.has(cid)) {
        classMap.set(cid, { classId: cid, className: a.classSession.class.name, present: 0, total: 0 });
      }
      const entry = classMap.get(cid)!;
      entry.total++;
      if (a.status === 'PRESENT') entry.present++;
    }

    // Progress
    const metricMap = new Map<string, any>();
    for (const p of student.progress) {
      const mid = p.progressMetricId;
      if (!metricMap.has(mid)) {
        metricMap.set(mid, {
          metricId: mid,
          metricName: p.progressMetric.name,
          metricType: p.progressMetric.type,
          classId: p.progressMetric.classId,
          className: p.progressMetric.class.name,
          entries: [],
        });
      }
      metricMap.get(mid).entries.push({
        date: p.classSession.date.toISOString(),
        value: p.value,
        notes: p.notes,
      });
    }

    return {
      id: student.id,
      name: student.name,
      nickname: student.nickname,
      parentName: student.parentName,
      dob: student.dob.toISOString(),
      age: this.calculateAge(student.dob),
      contactNumber: student.contactNumber,
      photoFileId: student.photoFileId,
      photoUrl,
      enrollments: student.enrollments.map((e) => ({
        id: e.id,
        classId: e.classId,
        className: e.class.name,
        classGrade: e.class.grade,
        academicYearId: e.academicYearId,
        academicYearName: e.academicYear.name,
        enrollmentDate: e.enrollmentDate.toISOString(),
        status: e.status,
      })),
      attendanceSummary: {
        totalSessions,
        present,
        absent,
        unsure,
        late: 0,
        excused: 0,
        percentage:
          totalSessions > 0
            ? Math.round((present / totalSessions) * 100)
            : 0,
        perClass: Array.from(classMap.values()).map((c) => ({
          classId: c.classId,
          className: c.className,
          percentage: c.total > 0 ? Math.round((c.present / c.total) * 100) : 0,
          total: c.total,
          present: c.present,
        })),
      },
      recentAttendance: student.attendance.slice(0, 10).map((a) => ({
        date: a.classSession.date.toISOString(),
        className: a.classSession.class.name,
        status: a.status,
      })),
      progress: Array.from(metricMap.values()),
      feedback: student.feedback.map((f) => ({
        id: f.id,
        date: f.classSession.date.toISOString(),
        className: f.classSession.class.name,
        teacherName: f.teacher.name,
        content: f.content,
      })),
      classHistory: student.classHistory.map((h) => ({
        id: h.id,
        classId: h.classId,
        className: h.class.name,
        academicYearName: h.academicYear.name,
        action: h.action,
        date: h.date.toISOString(),
      })),
      createdAt: student.createdAt.toISOString(),
    };
  }

  async create(data: {
    name: string;
    nickname?: string;
    parentName: string;
    dob: string;
    contactNumber: string;
    photoFileId?: string | null;
    classIds?: string[];
  }) {
    const academicYearId = data.classIds?.length
      ? await requireAcademicYearId(this.prisma)
      : undefined;
    const student = await this.prisma.student.create({
      data: {
        name: data.name,
        nickname: data.nickname ?? null,
        parentName: data.parentName,
        dob: new Date(data.dob),
        contactNumber: data.contactNumber,
        photoFileId: data.photoFileId ?? null,
        enrollments: data.classIds?.length
          ? { create: data.classIds.map((cid) => ({ classId: cid, academicYearId: academicYearId! })) }
          : undefined,
      },
    });
    return this.findOne(student.id);
  }

  async update(
    id: string,
    data: {
      name?: string;
      nickname?: string;
      parentName?: string;
      dob?: string;
      contactNumber?: string;
      photoFileId?: string | null;
    },
  ) {
    await this.prisma.student.update({
      where: { id },
      data: {
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.nickname !== undefined ? { nickname: data.nickname } : {}),
        ...(data.parentName !== undefined ? { parentName: data.parentName } : {}),
        ...(data.dob !== undefined ? { dob: new Date(data.dob) } : {}),
        ...(data.contactNumber !== undefined ? { contactNumber: data.contactNumber } : {}),
        ...(data.photoFileId !== undefined ? { photoFileId: data.photoFileId } : {}),
      },
    });
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.prisma.student.delete({ where: { id } });
    return { success: true };
  }

  // Enrollments
  async addEnrollment(studentId: string, classId: string, academicYearId?: string) {
    const yearId = await requireAcademicYearId(this.prisma, academicYearId);
    const existing = await this.prisma.classEnrollment.findUnique({
      where: {
        studentId_classId_academicYearId: { studentId, classId, academicYearId: yearId },
      },
    });
    const enrollment = existing ?? await this.prisma.classEnrollment.create({
      data: { studentId, classId, academicYearId: yearId },
    });
    return {
      id: enrollment.id,
      studentId: enrollment.studentId,
      classId: enrollment.classId,
      academicYearId: enrollment.academicYearId,
      enrollmentDate: enrollment.enrollmentDate.toISOString(),
      status: enrollment.status,
    };
  }

  async updateEnrollment(enrollmentId: string, data: { status?: string; classId?: string }) {
    const enrollment = await this.prisma.classEnrollment.update({
      where: { id: enrollmentId },
      data: {
        ...(data.status ? { status: data.status as any } : {}),
        ...(data.classId ? { classId: data.classId } : {}),
      },
      include: { class: true, academicYear: true },
    });
    return {
      id: enrollment.id,
      status: enrollment.status,
      classId: enrollment.classId,
      className: enrollment.class.name,
      academicYearId: enrollment.academicYearId,
      academicYearName: enrollment.academicYear.name,
    };
  }

  async deleteEnrollment(enrollmentId: string) {
    await this.prisma.classEnrollment.delete({ where: { id: enrollmentId } });
    return { success: true };
  }

  // Class History
  async addClassHistory(studentId: string, classId: string, academicYearId: string, action: string) {
    const entry = await this.prisma.studentClassHistory.create({
      data: { studentId, classId, academicYearId, action: action as any },
      include: { class: true, academicYear: true },
    });
    return {
      id: entry.id,
      studentId: entry.studentId,
      classId: entry.classId,
      className: entry.class.name,
      academicYearId: entry.academicYearId,
      academicYearName: entry.academicYear.name,
      action: entry.action,
      date: entry.date.toISOString(),
    };
  }
}
