import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async create(data: { studentId: string; progressMetricId: string; classSessionId: string; value: number; notes?: string | null }) {
    const entry = await this.prisma.studentProgress.create({
      data: {
        studentId: data.studentId,
        progressMetricId: data.progressMetricId,
        classSessionId: data.classSessionId,
        value: data.value,
        notes: data.notes ?? null,
      },
    });
    return {
      id: entry.id,
      studentId: entry.studentId,
      progressMetricId: entry.progressMetricId,
      classSessionId: entry.classSessionId,
      value: entry.value,
      notes: entry.notes,
      createdAt: entry.createdAt.toISOString(),
    };
  }

  async findByStudentAndClass(studentId: string, classId?: string) {
    const where: any = { studentId };
    if (classId) {
      where.progressMetric = { classId };
    }
    const entries = await this.prisma.studentProgress.findMany({
      where,
      include: {
        progressMetric: true,
        classSession: true,
      },
      orderBy: { classSession: { date: 'asc' } },
    });

    const metricMap = new Map<string, any>();
    for (const e of entries) {
      const mid = e.progressMetricId;
      if (!metricMap.has(mid)) {
        metricMap.set(mid, {
          metricId: mid,
          metricName: e.progressMetric.name,
          metricType: e.progressMetric.type,
          entries: [],
        });
      }
      metricMap.get(mid).entries.push({
        id: e.id,
        date: e.classSession.date.toISOString(),
        sessionId: e.classSessionId,
        value: e.value,
        notes: e.notes,
      });
    }

    return { metrics: Array.from(metricMap.values()) };
  }
}
