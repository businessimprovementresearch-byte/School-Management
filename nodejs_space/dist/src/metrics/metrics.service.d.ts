import { PrismaService } from '../prisma/prisma.service';
export declare class MetricsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(classId?: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        classId: string;
        className: string;
        type: import("@prisma/client").$Enums.MetricType;
    }[]>;
    create(data: {
        name: string;
        description?: string | null;
        classId: string;
        type: string;
    }): Promise<{
        id: string;
        name: string;
        description: string | null;
        classId: string;
        type: import("@prisma/client").$Enums.MetricType;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
