import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
export declare class ClassesService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    findAll(teacherClassIds?: string[]): Promise<{
        id: string;
        name: string;
        grade: string;
        description: string | null;
        studentCount: number;
        teachers: {
            id: string;
            name: string;
            photoFileId: string | null;
            photoUrl: string | null;
        }[];
        nextSessionDate: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        grade: string;
        description: string | null;
        teachers: {
            id: string;
            name: string;
            photoFileId: string | null;
            photoUrl: string | null;
        }[];
        students: {
            id: string;
            name: string;
            photoFileId: string | null;
            photoUrl: string | null;
            enrollmentStatus: import("@prisma/client").$Enums.EnrollmentStatus;
        }[];
        sessions: {
            id: string;
            date: string;
            attendanceSubmitted: boolean;
            termName: string | null;
        }[];
        metrics: {
            id: string;
            name: string;
            type: import("@prisma/client").$Enums.MetricType;
            description: string | null;
        }[];
    }>;
    assignTeacher(classId: string, teacherId: string): Promise<{
        id: string;
        classId: string;
        teacherId: string;
    }>;
    removeTeacher(classId: string, teacherId: string): Promise<{
        success: boolean;
    }>;
}
