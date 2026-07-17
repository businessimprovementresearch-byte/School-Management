import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class SessionsService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async create(classId: string, date: string, academicYearId: string, termId?: string | null) {
    const session = await this.prisma.classSession.create({
      data: {
        classId,
        date: new Date(date),
        academicYearId,
        termId: termId ?? null,
      },
    });
    return this.findOne(session.id);
  }

  async findOne(id: string) {
    const session = await this.prisma.classSession.findUnique({
      where: { id },
      include: {
        class: {
          include: {
            enrollments: {
              where: { status: 'ACTIVE' },
              include: { student: true },
            },
            assignments: { include: { teacher: true } },
          },
        },
        academicYear: true,
        term: true,
        studentAttendance: true,
        teacherAttendance: true,
        feedback: {
          include: { teacher: true, student: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!session) throw new NotFoundException('Session not found');

    const attendanceMap = new Map(session.studentAttendance.map((a) => [a.studentId, a.status]));
    const teacherAttMap = new Map(session.teacherAttendance.map((a) => [a.teacherId, a.status]));

    return {
      id: session.id,
      classId: session.classId,
      className: session.class.name,
      classGrade: session.class.grade,
      date: session.date.toISOString(),
      academicYearId: session.academicYearId,
      academicYearName: session.academicYear.name,
      termId: session.termId,
      termName: session.term?.name ?? null,
      attendanceSubmitted: session.studentAttendance.length > 0,
      students: await Promise.all(
        session.class.enrollments.map(async (e) => ({
          id: e.student.id,
          name: e.student.name,
          photoFileId: e.student.photoFileId,
          photoUrl: await this.uploadService.getFileUrlByFileId(e.student.photoFileId),
          attendanceStatus: attendanceMap.get(e.student.id) ?? null,
        })),
      ),
      teacherAttendance: session.class.assignments.map((a) => ({
        teacherId: a.teacher.id,
        teacherName: a.teacher.name,
        status: teacherAttMap.get(a.teacher.id) ?? null,
      })),
      feedback: session.feedback.map((f) => ({
        id: f.id,
        teacherName: f.teacher.name,
        content: f.content,
        type: f.type,
        studentId: f.studentId,
        studentName: f.student?.name ?? null,
        createdAt: f.createdAt.toISOString(),
      })),
    };
  }

  async remove(id: string) {
    await this.prisma.classSession.delete({ where: { id } });
    return { success: true };
  }

  async bulkCreateForDate(date: string, academicYearId?: string, termId?: string) {
    const day = new Date(date);
    const startOfDay = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0);
    const endOfDay = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59, 999);

    let yearId = academicYearId;
    if (!yearId) {
      const activeYear = await this.prisma.academicYear.findFirst({ where: { isActive: true } });
      if (!activeYear) {
        throw new BadRequestException('No active academic year found; specify academicYearId');
      }
      yearId = activeYear.id;
    }

    const classes = await this.prisma.class.findMany({
      include: {
        sessions: { where: { date: { gte: startOfDay, lte: endOfDay } } },
      },
      orderBy: { name: 'asc' },
    });

    const createdClassNames: string[] = [];
    const skippedClassNames: string[] = [];

    for (const cls of classes) {
      // Skip if a session already exists for this class on this date (idempotent — safe to click repeatedly)
      if (cls.sessions.length > 0) {
        skippedClassNames.push(cls.name);
        continue;
      }
      await this.prisma.classSession.create({
        data: {
          classId: cls.id,
          date: startOfDay,
          academicYearId: yearId,
          termId: termId ?? null,
        },
      });
      createdClassNames.push(cls.name);
    }

    return {
      success: true,
      date: startOfDay.toISOString(),
      totalClasses: classes.length,
      createdCount: createdClassNames.length,
      skippedCount: skippedClassNames.length,
      createdClassNames,
      skippedClassNames,
    };
  }
}