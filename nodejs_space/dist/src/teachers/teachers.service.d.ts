import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
export declare class TeachersService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    private calculateAge;
    private safeFileUrl;
    findAll(): Promise<{
        id: string;
        userId: string;
        name: string;
        nickname: string | null;
        email: string;
        isActive: boolean;
        dob: string | null;
        age: number | null;
        contactNumber: string | null;
        remarks: string | null;
        photoFileId: string | null;
        photoUrl: string | null;
        assignedClasses: {
            id: string;
            name: string;
            grade: string;
        }[];
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        userId: string;
        name: string;
        nickname: string | null;
        email: string;
        isActive: boolean;
        dob: string | null;
        age: number | null;
        contactNumber: string | null;
        remarks: string | null;
        photoFileId: string | null;
        photoUrl: string | null;
        assignedClasses: {
            id: string;
            name: string;
            grade: string;
        }[];
        assignedClassIds: string[];
        teachingHistory: {
            academicYearId: string;
            academicYearName: string;
            classes: any[];
        }[];
        attendanceSummary: {
            totalSessions: number;
            present: number;
            absent: number;
            percentage: number;
        };
        createdAt: string;
    }>;
    create(data: {
        name: string;
        nickname?: string | null;
        email?: string | null;
        password?: string | null;
        dob?: string | null;
        contactNumber?: string | null;
        remarks?: string | null;
        photoFileId?: string | null;
        isActive?: boolean;
        classIds?: string[];
    }): Promise<{
        id: string;
        userId: string;
        name: string;
        nickname: string | null;
        email: string;
        isActive: boolean;
        dob: string | null;
        age: number | null;
        contactNumber: string | null;
        remarks: string | null;
        photoFileId: string | null;
        photoUrl: string | null;
        assignedClasses: {
            id: string;
            name: string;
            grade: string;
        }[];
        assignedClassIds: string[];
        teachingHistory: {
            academicYearId: string;
            academicYearName: string;
            classes: any[];
        }[];
        attendanceSummary: {
            totalSessions: number;
            present: number;
            absent: number;
            percentage: number;
        };
        createdAt: string;
    }>;
    update(id: string, data: {
        name?: string;
        nickname?: string | null;
        email?: string | null;
        password?: string | null;
        dob?: string | null;
        contactNumber?: string | null;
        remarks?: string | null;
        photoFileId?: string | null;
        isActive?: boolean;
        classIds?: string[];
    }): Promise<{
        id: string;
        userId: string;
        name: string;
        nickname: string | null;
        email: string;
        isActive: boolean;
        dob: string | null;
        age: number | null;
        contactNumber: string | null;
        remarks: string | null;
        photoFileId: string | null;
        photoUrl: string | null;
        assignedClasses: {
            id: string;
            name: string;
            grade: string;
        }[];
        assignedClassIds: string[];
        teachingHistory: {
            academicYearId: string;
            academicYearName: string;
            classes: any[];
        }[];
        attendanceSummary: {
            totalSessions: number;
            present: number;
            absent: number;
            percentage: number;
        };
        createdAt: string;
    }>;
    setActive(id: string, isActive: boolean): Promise<{
        id: string;
        userId: string;
        name: string;
        nickname: string | null;
        email: string;
        isActive: boolean;
        dob: string | null;
        age: number | null;
        contactNumber: string | null;
        remarks: string | null;
        photoFileId: string | null;
        photoUrl: string | null;
        assignedClasses: {
            id: string;
            name: string;
            grade: string;
        }[];
        assignedClassIds: string[];
        teachingHistory: {
            academicYearId: string;
            academicYearName: string;
            classes: any[];
        }[];
        attendanceSummary: {
            totalSessions: number;
            present: number;
            absent: number;
            percentage: number;
        };
        createdAt: string;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
    findAvailableByClass(classId: string, academicYearId?: string): Promise<{
        id: string;
        userId: string;
        name: string;
        nickname: string | null;
        isActive: boolean;
        photoFileId: string | null;
        photoUrl: string | null;
    }[]>;
}
