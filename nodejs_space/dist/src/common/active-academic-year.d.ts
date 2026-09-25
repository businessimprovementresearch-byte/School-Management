import { PrismaService } from '../prisma/prisma.service';
export declare function requireAcademicYearId(prisma: PrismaService, explicitId?: string | null): Promise<string>;
