import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AcademicYearsService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    const years = await this.prisma.academicYear.findMany({ orderBy: { startDate: 'desc' } });
    return years.map((y) => ({
      id: y.id,
      name: y.name,
      startDate: y.startDate.toISOString(),
      endDate: y.endDate.toISOString(),
      isActive: y.isActive,
      createdAt: y.createdAt.toISOString(),
    }));
  }

  async create(data: { name: string; startDate: string; endDate: string }) {
    const year = await this.prisma.academicYear.create({
      data: {
        name: data.name,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      },
    });
    return {
      id: year.id,
      name: year.name,
      startDate: year.startDate.toISOString(),
      endDate: year.endDate.toISOString(),
      isActive: year.isActive,
    };
  }

  async update(id: string, data: { name?: string; startDate?: string; endDate?: string; isActive?: boolean }) {
    if (data.isActive === true) {
      await this.prisma.academicYear.updateMany({ data: { isActive: false } });
    }
    const year = await this.prisma.academicYear.update({
      where: { id },
      data: {
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.startDate !== undefined ? { startDate: new Date(data.startDate) } : {}),
        ...(data.endDate !== undefined ? { endDate: new Date(data.endDate) } : {}),
        ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
      },
    });
    return {
      id: year.id,
      name: year.name,
      startDate: year.startDate.toISOString(),
      endDate: year.endDate.toISOString(),
      isActive: year.isActive,
    };
  }

  async remove(id: string) {
    const year = await this.prisma.academicYear.findUnique({
      where: { id },
      include: { _count: { select: { terms: true, sessions: true, reportCards: true, history: true } } },
    });
    if (!year) throw new NotFoundException('Academic year not found');

    if (year.isActive) {
      throw new ConflictException('Cannot delete the active academic year. Activate another year first.');
    }

    const usageCount =
      year._count.terms + year._count.sessions + year._count.reportCards + year._count.history;
    if (usageCount > 0) {
      throw new ConflictException(
        `Cannot delete "${year.name}": it still has ${year._count.terms} term(s), ${year._count.sessions} session(s), ${year._count.reportCards} report card(s) and ${year._count.history} class history record(s) linked to it. Remove those first.`,
      );
    }

    await this.prisma.academicYear.delete({ where: { id } });
    return { success: true };
  }

  async rollover(
    toAcademicYearId: string,
    data: { fromAcademicYearId?: string; excludeStudentIds?: string[]; excludeTeacherIds?: string[] },
  ) {
    const toYear = await this.prisma.academicYear.findUnique({ where: { id: toAcademicYearId } });
    if (!toYear) throw new NotFoundException('Target academic year not found');

    const fromYearId = data.fromAcademicYearId ?? (await this.prisma.academicYear.findFirst({ where: { isActive: true } }))?.id;
    if (!fromYearId) throw new ConflictException('No source academic year to roll over from.');
    if (fromYearId === toAcademicYearId) throw new ConflictException('Source and target academic year must be different.');

    const excludeStudents = new Set(data.excludeStudentIds ?? []);
    const excludeTeachers = new Set(data.excludeTeacherIds ?? []);

    const [enrollments, assignments] = await Promise.all([
      this.prisma.classEnrollment.findMany({ where: { academicYearId: fromYearId, status: 'ACTIVE' } }),
      this.prisma.teacherAssignment.findMany({ where: { academicYearId: fromYearId } }),
    ]);

    let studentsEnrolled = 0, studentsArchived = 0;
    for (const e of enrollments) {
      if (excludeStudents.has(e.studentId)) { studentsArchived++; continue; }
      await this.prisma.classEnrollment.upsert({
        where: { studentId_classId_academicYearId: { studentId: e.studentId, classId: e.classId, academicYearId: toAcademicYearId } },
        create: { studentId: e.studentId, classId: e.classId, academicYearId: toAcademicYearId },
        update: {},
      });
      studentsEnrolled++;
    }

    let teachersAssigned = 0, teachersArchived = 0;
    for (const a of assignments) {
      if (excludeTeachers.has(a.teacherId)) { teachersArchived++; continue; }
      await this.prisma.teacherAssignment.upsert({
        where: { teacherId_classId_academicYearId: { teacherId: a.teacherId, classId: a.classId, academicYearId: toAcademicYearId } },
        create: { teacherId: a.teacherId, classId: a.classId, academicYearId: toAcademicYearId },
        update: {},
      });
      teachersAssigned++;
    }

    return { fromAcademicYearId: fromYearId, toAcademicYearId, studentsEnrolled, studentsArchived, teachersAssigned, teachersArchived };
  }
}
