import { PrismaService } from '../prisma/prisma.service';
import { ProgressMetricInfoDto } from './dto/progress-list-response.dto';
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
    bulkSave(classSessionId: string, progressMetricId: string, entries: {
        studentId: string;
        value: number;
        notes?: string | null;
    }[]): Promise<{
        savedCount: number;
    }>;
    findBySession(classSessionId: string, progressMetricId: string): Promise<{
        studentId: string;
        value: number;
        notes: string | null;
    }[]>;
    findByStudent(studentId: string, classId?: string): Promise<{
        metrics: ProgressMetricInfoDto[];
    }>;
}
