import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ProgressYearGroupDto,
  ProgressMetricListDto,
} from './dto/progress-list-response.dto';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) { }

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

  async findByStudent(studentId: string) {
    const entries = await this.prisma.studentProgress.findMany({
      where: { studentId },
      include: {
        progressMetric: { include: { class: true } },
        classSession: { include: { academicYear: true } },
      },
      orderBy: { classSession: { date: 'asc' } },
    });

    const yearMap = new Map<string, any>();
    for (const e of entries) {
      const yearId = e.classSession.academicYearId;
      if (!yearMap.has(yearId)) {
        yearMap.set(yearId, {
          academicYearId: yearId,
          academicYearName: e.classSession.academicYear.name,
          startDate: e.classSession.academicYear.startDate,
          classes: new Map<string, any>(),
        });
      }
      const yearEntry = yearMap.get(yearId);
      const classId = e.progressMetric.classId;
      if (!yearEntry.classes.has(classId)) {
        yearEntry.classes.set(classId, { classId, className: e.progressMetric.class.name, metrics: new Map<string, any>() });
      }
      const classEntry = yearEntry.classes.get(classId);
      const mid = e.progressMetricId;
      if (!classEntry.metrics.has(mid)) {
        classEntry.metrics.set(mid, { metricId: mid, metricName: e.progressMetric.name, metricType: e.progressMetric.type, entries: [] });
      }
      classEntry.metrics.get(mid).entries.push({
        id: e.id, date: e.classSession.date.toISOString(), sessionId: e.classSessionId, value: e.value, notes: e.notes,
      });
    }

    const years: ProgressYearGroupDto[] = Array.from(yearMap.values()).map((y: any) => ({
      academicYearId: y.academicYearId,
      academicYearName: y.academicYearName,
      classes: Array.from(y.classes.values()).map((c: any) => ({
        classId: c.classId,
        className: c.className,
        metrics: Array.from(c.metrics.values()) as ProgressMetricListDto[],
      })),
    }));

    return { years };
  }
}