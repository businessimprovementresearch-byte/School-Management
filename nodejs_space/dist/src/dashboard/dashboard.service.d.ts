import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboard(userId: string, role: string): Promise<{
        totalStudents: number;
        totalTeachers: number;
        activeClasses: number;
        todaySessions: {
            id: string;
            classId: string;
            className: string;
            date: string;
            attendanceSubmitted: boolean;
        }[];
        pendingAttendanceSessions: {
            id: string;
            classId: string;
            className: string;
            date: string;
        }[];
        recentFeedback: {
            id: string;
            classSessionId: string;
            teacherId: string;
            teacherName: string;
            studentId: string | null;
            studentName: string | null;
            content: string;
            type: import("@prisma/client").$Enums.FeedbackType;
            createdAt: string;
        }[];
        activeAcademicYear: {
            id: string;
            name: string;
        } | null;
    }>;
}
