import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: { classSessionId: string; content: string; type: string; studentId?: string | null }) {
    const teacher = await this.prisma.teacher.findUnique({ where: { userId } });
    const teacherId = teacher?.id;
    if (!teacherId) {
      throw new ForbiddenException('Only teacher accounts can post feedback. Please log in with a teacher account.');
    }
    const feedback = await this.prisma.feedback.create({
      data: {
        classSessionId: data.classSessionId,
        teacherId,
        studentId: data.type === 'STUDENT_SPECIFIC' ? data.studentId ?? null : null,
        content: data.content,
        type: data.type as any,
      },
      include: { teacher: true, student: true },
    });
    return {
      id: feedback.id,
      classSessionId: feedback.classSessionId,
      teacherId: feedback.teacherId,
      teacherName: feedback.teacher.name,
      studentId: feedback.studentId,
      studentName: feedback.student?.name ?? null,
      content: feedback.content,
      type: feedback.type,
      createdAt: feedback.createdAt.toISOString(),
    };
  }
}
