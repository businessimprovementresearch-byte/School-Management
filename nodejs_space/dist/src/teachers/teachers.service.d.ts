import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
export declare class TeachersService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    private calculateAge;
    findAll(): Promise<{
        id: string;
        userId: string;
        name: string;
        nickname: string | null;
        isActive: boolean;
        email: string;
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
        teachingHistory: never[];
        attendanceSummary: {
            totalSessions: number;
            present: number;
            absent: number;
            percentage: number;
        };
        createdAt: string;
    }>;
    create(dto: CreateTeacherDto): Promise<{
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
        teachingHistory: never[];
        attendanceSummary: {
            totalSessions: number;
            present: number;
            absent: number;
            percentage: number;
        };
        createdAt: string;
    }>;
    update(id: string, dto: UpdateTeacherDto): Promise<{
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
        teachingHistory: never[];
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
        teachingHistory: never[];
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
