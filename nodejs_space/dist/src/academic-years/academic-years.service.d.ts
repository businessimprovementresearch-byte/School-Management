import { PrismaService } from '../prisma/prisma.service';
export declare class AcademicYearsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        name: string;
        startDate: string;
        endDate: string;
        isActive: boolean;
        createdAt: string;
    }[]>;
    create(data: {
        name: string;
        startDate: string;
        endDate: string;
    }): Promise<{
        id: string;
        name: string;
        startDate: string;
        endDate: string;
        isActive: boolean;
    }>;
    update(id: string, data: {
        name?: string;
        startDate?: string;
        endDate?: string;
        isActive?: boolean;
    }): Promise<{
        id: string;
        name: string;
        startDate: string;
        endDate: string;
        isActive: boolean;
    }>;
}
