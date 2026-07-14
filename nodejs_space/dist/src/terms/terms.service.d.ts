import { PrismaService } from '../prisma/prisma.service';
export declare class TermsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(academicYearId?: string): Promise<{
        id: string;
        name: string;
        startDate: string;
        endDate: string;
        academicYearId: string;
        academicYearName: string;
    }[]>;
    create(data: {
        name: string;
        startDate: string;
        endDate: string;
        academicYearId: string;
    }): Promise<{
        id: string;
        name: string;
        startDate: string;
        endDate: string;
        academicYearId: string;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
