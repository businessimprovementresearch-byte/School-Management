import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
export declare class SessionsService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    create(classId: string, date: string, academicYearId: string, termId?: string | null): Promise<{
        id: string;
        classId: string;
        className: string;
        classGrade: string;
        date: string;
        academicYearId: string;
        academicYearName: string;
        termId: string | null;
        termName: string | null;
        attendanceSubmitted: boolean;
        students: {
            id: string;
            name: string;
            photoFileId: string | null;
            photoUrl: string | null;
            attendanceStatus: import("@prisma/client").$Enums.AttendanceStatus | null;
        }[];
        teacherAttendance: {
            teacherId: string;
            teacherName: string;
            status: import("@prisma/client").$Enums.TeacherAttendanceStatus | null;
        }[];
        feedback: {
            id: string;
            teacherName: string;
            content: string;
            type: import("@prisma/client").$Enums.FeedbackType;
            studentId: string | null;
            studentName: string | null;
            createdAt: string;
        }[];
    }>;
    findOne(id: string): Promise<{
        id: string;
        classId: string;
        className: string;
        classGrade: string;
        date: string;
        academicYearId: string;
        academicYearName: string;
        termId: string | null;
        termName: string | null;
        attendanceSubmitted: boolean;
        students: {
            id: string;
            name: string;
            photoFileId: string | null;
            photoUrl: string | null;
            attendanceStatus: import("@prisma/client").$Enums.AttendanceStatus | null;
        }[];
        teacherAttendance: {
            teacherId: string;
            teacherName: string;
            status: import("@prisma/client").$Enums.TeacherAttendanceStatus | null;
        }[];
        feedback: {
            id: string;
            teacherName: string;
            content: string;
            type: import("@prisma/client").$Enums.FeedbackType;
            studentId: string | null;
            studentName: string | null;
            createdAt: string;
        }[];
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
