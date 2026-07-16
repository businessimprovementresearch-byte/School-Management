import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
        total: data.total,
        percentage: data.total > 0 ? Math.round((data.present / data.total) * 100) : 0,
      })),
    };
  }
}