import { PrismaService } from '../prisma/prisma.service';
export declare class FeedbackService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, data: {
        classSessionId: string;
        content: string;
        type: string;
        studentId?: string | null;
    }): Promise<{
        id: string;
        classSessionId: string;
        teacherId: string;
        teacherName: string;
        studentId: string | null;
        studentName: string | null;
        content: string;
        type: import("@prisma/client").$Enums.FeedbackType;
        createdAt: string;
    }>;
}
