import { Injectable } from '@nestjs/common';
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
}
