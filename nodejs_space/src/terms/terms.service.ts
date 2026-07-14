import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TermsService {
  constructor(private prisma: PrismaService) {}

  async findAll(academicYearId?: string) {
    const where = academicYearId ? { academicYearId } : {};
    const terms = await this.prisma.term.findMany({
      where,
      include: { academicYear: true },
      orderBy: { startDate: 'asc' },
    });
    return terms.map((t) => ({
      id: t.id,
      name: t.name,
      startDate: t.startDate.toISOString(),
      endDate: t.endDate.toISOString(),
      academicYearId: t.academicYearId,
      academicYearName: t.academicYear.name,
    }));
  }

  async create(data: { name: string; startDate: string; endDate: string; academicYearId: string }) {
    const term = await this.prisma.term.create({
      data: {
        name: data.name,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        academicYearId: data.academicYearId,
      },
    });
    return {
      id: term.id,
      name: term.name,
      startDate: term.startDate.toISOString(),
      endDate: term.endDate.toISOString(),
      academicYearId: term.academicYearId,
    };
  }

  async remove(id: string) {
    const term = await this.prisma.term.findUnique({ where: { id } });
    if (!term) throw new NotFoundException('Term not found');
    await this.prisma.term.delete({ where: { id } });
    return { success: true };
  }
}
