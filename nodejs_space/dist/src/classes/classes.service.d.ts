import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
export declare class ClassesService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    findAll(teacherClassIds?: string[], academicYearId?: string): Promise<{
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
    findOne(id: string, academicYearId?: string): Promise<{
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
            isHoliday: boolean;
            termName: string | null;
        }[];
        metrics: {
            id: string;
            name: string;
            type: import("@prisma/client").$Enums.MetricType;
            description: string | null;
        }[];
    }>;
    assignTeacher(classId: string, teacherId: string, academicYearId?: string): Promise<{
        id: string;
        classId: string;
        teacherId: string;
        academicYearId: string;
    }>;
    removeTeacher(classId: string, teacherId: string, academicYearId?: string): Promise<{
        success: boolean;
    }>;
    setYearStatus(classId: string, academicYearId: string, isActive: boolean): Promise<{
        id: string;
        isActive: boolean;
        classId: string;
        academicYearId: string;
    }>;
    remove(classId: string): Promise<{
        success: boolean;
    }>;
    create(data: {
        name: string;
        grade: string;
        description?: string;
    }): Promise<{
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
            isHoliday: boolean;
            termName: string | null;
        }[];
        metrics: {
            id: string;
            name: string;
            type: import("@prisma/client").$Enums.MetricType;
            description: string | null;
        }[];
    }>;
    update(classId: string, data: {
        name?: string;
        grade?: string;
        description?: string;
    }): Promise<{
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
            isHoliday: boolean;
            termName: string | null;
        }[];
        metrics: {
            id: string;
            name: string;
            type: import("@prisma/client").$Enums.MetricType;
            description: string | null;
        }[];
    }>;
}
