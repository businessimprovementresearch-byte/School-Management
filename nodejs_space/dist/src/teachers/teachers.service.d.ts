import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
export declare class TeachersService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    private calculateAge;
    findAll(): Promise<{
        id: string;
        userId: string;
        name: string;
        dob: string;
        age: number;
        contactNumber: string;
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
        dob: string;
        age: number;
        contactNumber: string;
        photoFileId: string | null;
        photoUrl: string | null;
        assignedClasses: {
            id: string;
            name: string;
            grade: string;
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
        email: string;
        password: string;
        name: string;
        dob: string;
        contactNumber: string;
        photoFileId?: string | null;
        classIds?: string[];
    }): Promise<{
        id: string;
        userId: string;
        name: string;
        dob: string;
        age: number;
        contactNumber: string;
        photoFileId: string | null;
        photoUrl: string | null;
        assignedClasses: {
            id: string;
            name: string;
            grade: string;
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
        dob?: string;
        contactNumber?: string;
        photoFileId?: string | null;
    }): Promise<{
        id: string;
        userId: string;
        name: string;
        dob: string;
        age: number;
        contactNumber: string;
        photoFileId: string | null;
        photoUrl: string | null;
        assignedClasses: {
            id: string;
            name: string;
            grade: string;
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
}
