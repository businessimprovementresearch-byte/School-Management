import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ProgressMetricInfoDto,
  ProgressEntryItemDto,
} from './dto/progress-list-response.dto';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    studentId: string;
    progressMetricId: string;
    classSessionId: string;
    value: number;
    notes?: string | null;
  }) {
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

  async bulkSave(
    classSessionId: string,
    progressMetricId: string,
    entries: { studentId: string; value: number; notes?: string | null }[],
  ) {
    let savedCount = 0;
    for (const e of entries) {
      const existing = await this.prisma.studentProgress.findFirst({
        where: { studentId: e.studentId, progressMetricId, classSessionId },
      });
      if (existing) {
        await this.prisma.studentProgress.update({
          where: { id: existing.id },
          data: { value: e.value, notes: e.notes ?? null },
        });
      } else {
        await this.prisma.studentProgress.create({
          data: {
            studentId: e.studentId,
            progressMetricId,
            classSessionId,
            value: e.value,
            notes: e.notes ?? null,
          },
        });
      }
      savedCount++;
    }
    return { savedCount };
  }

  async findBySession(classSessionId: string, progressMetricId: string) {
    const entries = await this.prisma.studentProgress.findMany({
      where: { classSessionId, progressMetricId },
    });
    return entries.map((e) => ({
      studentId: e.studentId,
      value: e.value,
      notes: e.notes,
    }));
  }

  async findByStudent(studentId: string, classId?: string) {
    const entries = await this.prisma.studentProgress.findMany({
      where: {
        studentId,
        ...(classId ? { progressMetric: { classId } } : {}),
      },
      include: {
        progressMetric: { include: { class: true } },
        classSession: { include: { academicYear: true } },
      },
      orderBy: { classSession: { date: 'asc' } },
    });

    const metricMap = new Map<
      string,
      {
        metricId: string;
        metricName: string;
        metricType: string;
        classId: string;
        className: string;
        entries: ProgressEntryItemDto[];
      }
    >();

    for (const p of entries) {
      const mid = p.progressMetricId;
      if (!metricMap.has(mid)) {
        metricMap.set(mid, {
          metricId: mid,
          metricName: p.progressMetric.name,
          metricType: p.progressMetric.type,
          classId: p.progressMetric.classId,
          className: p.progressMetric.class.name,
          entries: [],
        });
      }
      metricMap.get(mid)!.entries.push({
        id: p.id,
        date: p.classSession.date.toISOString(),
        sessionId: p.classSessionId,
        value: p.value,
        notes: p.notes,
      });
    }

    const metrics: ProgressMetricInfoDto[] = Array.from(metricMap.values());

    return {
      metrics,
    };
  }
}
