import { PrismaService } from '../prisma/prisma.service';
export declare class AttendanceService {
    private prisma;
    constructor(prisma: PrismaService);
    bulkSave(sessionId: string, studentAttendance: {
        studentId: string;
        status: string;
    }[], teacherAttendance?: {
        teacherId: string;
        status: string;
    }[]): Promise<{
        success: boolean;
        savedCount: number;
    }>;
    getOverview(classId: string, month: number, year: number): Promise<{
        sessions: {
            id: string;
            date: string;
            attendanceSubmitted: boolean;
        }[];
        classSummary: {
            totalSessions: number;
            averageAttendance: number;
        };
        studentBreakdown: {
            studentId: string;
            studentName: string;
            present: number;
            absent: number;
            unsure: number;
            late: number;
            excused: number;
            total: number;
            percentage: number;
        }[];
    }>;
    getByDate(date: string): Promise<{
        date: string;
        classes: {
            classId: string;
            className: string;
            grade: string;
            sessionId: string;
            attendanceSubmitted: boolean;
            totalStudents: number;
            present: number;
            absent: number;
            unsure: number;
        }[];
    }>;
}
