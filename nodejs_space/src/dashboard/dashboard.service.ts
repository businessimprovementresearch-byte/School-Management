import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboard(userId: string, role: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let teacherClassIds: string[] | undefined;
    if (role === 'TEACHER') {
      const teacher = await this.prisma.teacher.findUnique({
        where: { userId },
        include: { assignments: true },
      });
      teacherClassIds = teacher?.assignments?.map((a) => a.classId) ?? [];
    }

    const classFilter = teacherClassIds ? { id: { in: teacherClassIds } } : {};

    const [totalStudents, totalTeachers, activeClasses] = await Promise.all([
      role === 'ADMIN'
        ? this.prisma.student.count()
        : this.prisma.student.count({
            where: {
              enrollments: {
                some: { classId: { in: teacherClassIds ?? [] }, status: 'ACTIVE' },
              },
            },
          }),
      role === 'ADMIN'
        ? this.prisma.teacher.count()
        : (teacherClassIds?.length ?? 0),
      this.prisma.class.count({ where: classFilter }),
    ]);

    const todaySessions = await this.prisma.classSession.findMany({
      where: {
        date: { gte: today, lt: tomorrow },
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
      }));

    const recentFeedback = await this.prisma.feedback.findMany({
      where: teacherClassIds
        ? { classSession: { classId: { in: teacherClassIds } } }
        : {},
      include: {
        teacher: true,
        student: true,
        classSession: { include: { class: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const activeAcademicYear = await this.prisma.academicYear.findFirst({
      where: { isActive: true },
    });

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
