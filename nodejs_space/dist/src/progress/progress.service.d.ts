import { PrismaService } from '../prisma/prisma.service';
export declare class ProgressService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        studentId: string;
        progressMetricId: string;
        classSessionId: string;
        value: number;
        notes?: string | null;
    }): Promise<{
        id: string;
        studentId: string;
        progressMetricId: string;
        classSessionId: string;
        value: number;
        notes: string | null;
        createdAt: string;
    }>;
    findByStudentAndClass(studentId: string, classId?: string): Promise<{
        metrics: any[];
    }>;
}
