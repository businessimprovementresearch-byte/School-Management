import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { gradeRank } from '../common/grade-order';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) { }

  async bulkSave(
    sessionId: string,
    studentAttendance: { studentId: string; status: string }[],
    teacherAttendance?: { teacherId: string; status: string }[],
  ) {
    let savedCount = 0;

    for (const sa of studentAttendance) {
      await this.prisma.studentAttendance.upsert({
        where: {
          studentId_classSessionId: {
            studentId: sa.studentId,
            classSessionId: sessionId,
          },
        },
        update: { status: sa.status as any },
        create: {
          studentId: sa.studentId,
          classSessionId: sessionId,
          status: sa.status as any,
        },
      });
      savedCount++;
    }

    if (teacherAttendance) {
      for (const ta of teacherAttendance) {
        await this.prisma.teacherAttendance.upsert({
          where: {
            teacherId_classSessionId: {
              teacherId: ta.teacherId,
              classSessionId: sessionId,
            },
          },
          update: { status: ta.status as any },
          create: {
            teacherId: ta.teacherId,
            classSessionId: sessionId,
            status: ta.status as any,
          },
        });
        savedCount++;
      }
    }

    return { success: true, savedCount };
  }

  async getOverview(classId: string, month: number, year: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const sessions = await this.prisma.classSession.findMany({
      where: {
        classId,
        date: { gte: startDate, lte: endDate },
      },
      include: {
        studentAttendance: { include: { student: true } },
      },
      orderBy: { date: 'asc' },
    });

    const sessionList = sessions.map((s) => ({
      id: s.id,
      date: s.date.toISOString(),
      attendanceSubmitted: s.studentAttendance.length > 0,
    }));

    const totalSessions = sessions.length;
    let totalPresent = 0;
    let totalRecords = 0;

    const studentMap = new Map<string, { name: string; present: number; absent: number; unsure: number; total: number }>();

    for (const session of sessions) {
      for (const att of session.studentAttendance) {
        if (!studentMap.has(att.studentId)) {
          studentMap.set(att.studentId, {
            name: att.student.name,
            present: 0, absent: 0, unsure: 0, total: 0,
          });
        }
        const entry = studentMap.get(att.studentId)!;
        entry.total++;
        totalRecords++;
        if (att.status === 'PRESENT') { entry.present++; totalPresent++; }
        else if (att.status === 'ABSENT') entry.absent++;
        else if (att.status === 'UNSURE') entry.unsure++;
      }
    }

    return {
      sessions: sessionList,
      classSummary: {
        totalSessions,
        averageAttendance: totalRecords > 0 ? Math.round((totalPresent / totalRecords) * 100) : 0,
      },
      studentBreakdown: Array.from(studentMap.entries()).map(([studentId, data]) => ({
        studentId,
        studentName: data.name,
        present: data.present,
        absent: data.absent,
        unsure: data.unsure,
        late: 0,
        excused: 0,
        total: data.total,
        percentage:
          data.total > 0
            ? Math.round((data.present / data.total) * 100)
            : 0,
      })),
    };
  }

  async getByDate(date: string) {
    const day = new Date(date);
    const startOfDay = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0);
    const endOfDay = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59, 999);

    const classes = await this.prisma.class.findMany({
      include: {
        enrollments: { where: { status: 'ACTIVE' } },
        sessions: {
          where: { date: { gte: startOfDay, lte: endOfDay } },
          include: { studentAttendance: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return {
      date: startOfDay.toISOString(),
      classes: classes
        .map((c) => {
        const session = c.sessions[0];
        let present = 0;
        let absent = 0;
        let unsure = 0;
        for (const att of session?.studentAttendance ?? []) {
          if (att.status === 'PRESENT') present++;
          else if (att.status === 'ABSENT') absent++;
          else if (att.status === 'UNSURE') unsure++;
        }
        return {
          classId: c.id,
          className: c.name,
          grade: c.grade,
          sessionId: session?.id ?? null,
          attendanceSubmitted: (session?.studentAttendance.length ?? 0) > 0,
          totalStudents: c.enrollments.length,
          present,
          absent,
          unsure,
        };
      })
      .sort((a, b) => gradeRank(a.grade) - gradeRank(b.grade) || a.className.localeCompare(b.className)),
    };
  }
}