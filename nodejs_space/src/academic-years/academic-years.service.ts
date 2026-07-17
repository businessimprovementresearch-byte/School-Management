import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AcademicYearsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const years = await this.prisma.academicYear.findMany({ orderBy: { startDate: 'desc' } });
    return years.map((y) => ({
      id: y.id,
      name: y.name,
      startDate: y.startDate.toISOString(),
      endDate: y.endDate.toISOString(),
      isActive: y.isActive,
      createdAt: y.createdAt.toISOString(),
    }));
  }

  async create(data: { name: string; startDate: string; endDate: string }) {
    const year = await this.prisma.academicYear.create({
      data: {
        name: data.name,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      },
    });
    return {
      id: year.id,
      name: year.name,
      startDate: year.startDate.toISOString(),
      endDate: year.endDate.toISOString(),
      isActive: year.isActive,
    };
  }

  async update(id: string, data: { name?: string; startDate?: string; endDate?: string; isActive?: boolean }) {
    if (data.isActive === true) {
      await this.prisma.academicYear.updateMany({ data: { isActive: false } });
    }
    const year = await this.prisma.academicYear.update({
      where: { id },
      data: {
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.startDate !== undefined ? { startDate: new Date(data.startDate) } : {}),
        ...(data.endDate !== undefined ? { endDate: new Date(data.endDate) } : {}),
        ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
      },
    });
    return {
      id: year.id,
      name: year.name,
      startDate: year.startDate.toISOString(),
      endDate: year.endDate.toISOString(),
      isActive: year.isActive,
    };
  }

  async remove(id: string) {
    const year = await this.prisma.academicYear.findUnique({
      where: { id },
      include: { _count: { select: { terms: true, sessions: true, reportCards: true, history: true } } },
    });
    if (!year) throw new NotFoundException('Academic year not found');

    if (year.isActive) {
      throw new ConflictException('Cannot delete the active academic year. Activate another year first.');
    }

    const usageCount =
      year._count.terms + year._count.sessions + year._count.reportCards + year._count.history;
    if (usageCount > 0) {
      throw new ConflictException(
        `Cannot delete "${year.name}": it still has ${year._count.terms} term(s), ${year._count.sessions} session(s), ${year._count.reportCards} report card(s) and ${year._count.history} class history record(s) linked to it. Remove those first.`,
      );
    }

    await this.prisma.academicYear.delete({ where: { id } });
    return { success: true };
  }
}
