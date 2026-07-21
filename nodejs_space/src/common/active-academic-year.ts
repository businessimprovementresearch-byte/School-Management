import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export async function requireAcademicYearId(
    prisma: PrismaService,
    explicitId?: string | null,
): Promise<string> {
    if (explicitId) return explicitId;

    const active = await prisma.academicYear.findFirst({ where: { isActive: true } });
    if (active) return active.id;

    const latest = await prisma.academicYear.findFirst({ orderBy: { startDate: 'desc' } });
    if (latest) return latest.id;

    throw new BadRequestException('No academic year exists yet. Create one first under Academic Years.');
}