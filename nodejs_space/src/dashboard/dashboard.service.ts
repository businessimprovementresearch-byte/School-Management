import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { requireAcademicYearId } from '../common/active-academic-year';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboard(userId: string, role: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let teacherClassIds: string[] | undefined;
    let teacherId: string | undefined;
    if (role === 'TEACHER') {
      const teacher = await this.prisma.teacher.findUnique({
        where: { userId },
        include: { assignments: true },
      });
      teacherId = teacher?.id;
      teacherClassIds = teacher?.assignments?.map((a) => a.classId) ?? [];
    }

    const activeYearId = await requireAcademicYearId(this.prisma).catch(
      () => null,
    );

    // Classes that are inactive for the active academic year are excluded.
    let inactiveClassIds: string[] = [];
    if (activeYearId) {
      inactiveClassIds = (
        await this.prisma.classYearStatus.findMany({
          where: { academicYearId: activeYearId, isActive: false },
          select: { classId: true },
        })
      ).map((r) => r.classId);
    }

    const [totalStudents, totalTeachers, activeClasses] = await Promise.all([
      role === 'ADMIN'
        ? this.prisma.student.count({
            where: activeYearId
              ? {
                  enrollments: {
                    some: { academicYearId: activeYearId, status: 'ACTIVE' },
                  },
                }
              : undefined,
          })
        : this.prisma.student.count({
            where: {
              enrollments: {
                some: {
                  classId: { in: teacherClassIds ?? [] },
                  status: 'ACTIVE',
                  ...(activeYearId ? { academicYearId: activeYearId } : {}),
                },
              },
            },
          }),
      role === 'ADMIN'
        ? this.prisma.teacher.count({
            where: activeYearId
              ? { assignments: { some: { academicYearId: activeYearId } } }
              : undefined,
          })
        : teacherId
          ? this.prisma.teacher.count({
              where: { id: teacherId },
            })
          : 0,
      this.prisma.class.count({
        where: {
          ...(teacherClassIds ? { id: { in: teacherClassIds } } : {}),
          ...(inactiveClassIds.length
            ? { id: { notIn: inactiveClassIds } }
            : {}),
        },
      }),
    ]);

    const todaySessions = await this.prisma.classSession.findMany({
      where: {
        date: { gte: today, lt: tomorrow },
        ...(activeYearId ? { academicYearId: activeYearId } : {}),
        ...(teacherClassIds ? { classId: { in: teacherClassIds } } : {}),
      },
      include: {
        class: true,
        studentAttendance: true,
      },
    });

    const pendingAttendanceSessions = todaySessions
      .filter((s) => s.studentAttendance.length === 0 && !s.isHoliday)
      .map((s) => ({
        id: s.id,
        classId: s.classId,
        className: s.class.name,
        date: s.date.toISOString(),
        academicYearId: s.academicYearId,
      }));

    const recentFeedback = await this.prisma.feedback.findMany({
      where: teacherClassIds
        ? { classSession: { classId: { in: teacherClassIds } } }
        : activeYearId
          ? { classSession: { academicYearId: activeYearId } }
          : {},
      include: {
        teacher: true,
        student: true,
        classSession: { include: { class: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const activeAcademicYear = activeYearId
      ? await this.prisma.academicYear.findUnique({
          where: { id: activeYearId },
        })
      : await this.prisma.academicYear.findFirst({ where: { isActive: true } });

    return {
      totalStudents,
      totalTeachers,
      activeClasses,
      todaySessions: todaySessions.map((s) => ({
        id: s.id,
        classId: s.classId,
        className: s.class.name,
        date: s.date.toISOString(),
        attendanceSubmitted: s.studentAttendance.length > 0,
        academicYearId: s.academicYearId,
      })),
      pendingAttendanceSessions,
      recentFeedback: recentFeedback.map((f) => ({
        id: f.id,
        classSessionId: f.classSessionId,
        teacherId: f.teacherId,
        teacherName: f.teacher.name,
        studentId: f.studentId,
        studentName: f.student?.name ?? null,
        content: f.content,
        type: f.type,
        createdAt: f.createdAt.toISOString(),
      })),
      activeAcademicYear: activeAcademicYear
        ? { id: activeAcademicYear.id, name: activeAcademicYear.name }
        : null,
    };
  }
}
