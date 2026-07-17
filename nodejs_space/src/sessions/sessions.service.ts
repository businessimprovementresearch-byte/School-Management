import { Injectable, NotFoundException } from '@nestjs/common';
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
}
