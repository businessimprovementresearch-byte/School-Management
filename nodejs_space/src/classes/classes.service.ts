import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { sortByGrade } from '../common/grade-order';
import { requireAcademicYearId } from '../common/active-academic-year';

@Injectable()
export class ClassesService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async findAll(teacherClassIds?: string[]) {
    const where = teacherClassIds ? { id: { in: teacherClassIds } } : {};
    const activeYearId = await requireAcademicYearId(this.prisma).catch(() => null);
    const classes = await this.prisma.class.findMany({
      where,
      include: {
        enrollments: activeYearId
          ? { where: { status: 'ACTIVE', academicYearId: activeYearId } }
          : { where: { status: 'ACTIVE' } },
        assignments: {
          include: { teacher: true },
          ...(activeYearId ? { where: { academicYearId: activeYearId } } : {}),
        },
        sessions: { orderBy: { date: 'desc' }, take: 1 },
      },
      orderBy: { name: 'asc' },
    });

    const mapped = await Promise.all(
      classes.map(async (c) => ({
        id: c.id,
        name: c.name,
        grade: c.grade,
        description: c.description,
        studentCount: c.enrollments.length,
        teachers: await Promise.all(
          c.assignments.map(async (a) => ({
            id: a.teacher.id,
            name: a.teacher.name,
            photoFileId: a.teacher.photoFileId,
            photoUrl: await this.uploadService.getFileUrlByFileId(a.teacher.photoFileId),
          })),
        ),
        nextSessionDate: c.sessions?.[0]?.date?.toISOString() ?? null,
      })),
    );
    return sortByGrade(mapped);
  }

  async findOne(id: string) {
    const activeYearId = await requireAcademicYearId(this.prisma).catch(() => null);
    const cls = await this.prisma.class.findUnique({
      where: { id },
      include: {
        assignments: {
          include: { teacher: true },
          ...(activeYearId ? { where: { academicYearId: activeYearId } } : {}),
        },
        enrollments: {
          include: { student: true },
          ...(activeYearId ? { where: { academicYearId: activeYearId } } : {}),
        },
        sessions: {
          include: {
            studentAttendance: true,
            term: true,
          },
          orderBy: { date: 'desc' },
          take: 50,
        },
        metrics: true,
      },
    });
    if (!cls) throw new NotFoundException('Class not found');

    return {
      id: cls.id,
      name: cls.name,
      grade: cls.grade,
      description: cls.description,
      teachers: await Promise.all(
        cls.assignments.map(async (a) => ({
          id: a.teacher.id,
          name: a.teacher.name,
          photoFileId: a.teacher.photoFileId,
          photoUrl: await this.uploadService.getFileUrlByFileId(a.teacher.photoFileId),
        })),
      ),
      students: await Promise.all(
        cls.enrollments.map(async (e) => ({
          id: e.student.id,
          name: e.student.name,
          photoFileId: e.student.photoFileId,
          photoUrl: await this.uploadService.getFileUrlByFileId(e.student.photoFileId),
          enrollmentStatus: e.status,
        })),
      ),
      sessions: cls.sessions.map((s) => ({
        id: s.id,
        date: s.date.toISOString(),
        attendanceSubmitted: s.studentAttendance.length > 0,
        termName: s.term?.name ?? null,
      })),
      metrics: cls.metrics.map((m) => ({
        id: m.id,
        name: m.name,
        type: m.type,
        description: m.description,
      })),
    };
  }

  async assignTeacher(classId: string, teacherId: string, academicYearId?: string) {
    const yearId = await requireAcademicYearId(this.prisma, academicYearId);
    const assignment = await this.prisma.teacherAssignment.create({
      data: { classId, teacherId, academicYearId: yearId },
    });
    return { id: assignment.id, classId: assignment.classId, teacherId: assignment.teacherId, academicYearId: assignment.academicYearId };
  }

  async removeTeacher(classId: string, teacherId: string, academicYearId?: string) {
    const yearId = await requireAcademicYearId(this.prisma, academicYearId);
    await this.prisma.teacherAssignment.deleteMany({ where: { classId, teacherId, academicYearId: yearId } });
    return { success: true };
  }
}
