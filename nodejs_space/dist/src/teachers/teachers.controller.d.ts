import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
export declare class TeachersController {
    private readonly teachersService;
    constructor(teachersService: TeachersService);
    findAll(): Promise<{
        id: string;
        userId: string;
        name: string | null;
        nickname: string | null;
        gelar: null;
        alamat: null;
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
        name: string | null;
        nickname: string | null;
        gelar: null;
        alamat: null;
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
        name: string | null;
        nickname: string | null;
        gelar: null;
        alamat: null;
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
        name: string | null;
        nickname: string | null;
        gelar: null;
        alamat: null;
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
        name: string | null;
        nickname: string | null;
        gelar: null;
        alamat: null;
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
