import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MetricsService {
  constructor(private prisma: PrismaService) {}

  async findAll(classId?: string) {
    const where = classId ? { classId } : {};
    const metrics = await this.prisma.progressMetric.findMany({
      where,
      include: { class: true },
      orderBy: { name: 'asc' },
    });
    return metrics.map((m) => ({
      id: m.id,
      name: m.name,
      description: m.description,
      classId: m.classId,
      className: m.class.name,
      type: m.type,
    }));
  }

  async create(data: { name: string; description?: string | null; classId: string; type: string }) {
    const metric = await this.prisma.progressMetric.create({
      data: {
        name: data.name,
        description: data.description ?? null,
        classId: data.classId,
        type: data.type as any,
      },
    });
    return {
      id: metric.id,
      name: metric.name,
      description: metric.description,
      classId: metric.classId,
      type: metric.type,
    };
  }

  async remove(id: string) {
    const metric = await this.prisma.progressMetric.findUnique({ where: { id } });
    if (!metric) throw new NotFoundException('Metric not found');
    await this.prisma.progressMetric.delete({ where: { id } });
    return { success: true };
  }
}
