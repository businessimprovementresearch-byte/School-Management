import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
export declare class StudentsService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    private calculateAge;
    findAll(search?: string, classId?: string, page?: number, limit?: number, teacherClassIds?: string[]): Promise<{
        items: {
            id: string;
            name: string;
            parentName: string;
            dob: string;
            age: number;
            contactNumber: string;
            photoFileId: string | null;
            photoUrl: string | null;
            enrolledClasses: {
                id: string;
                name: string;
                grade: string;
            }[];
        }[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        parentName: string;
        dob: string;
        age: number;
        contactNumber: string;
        photoFileId: string | null;
        photoUrl: string | null;
        enrollments: {
            id: string;
            classId: string;
            className: string;
            classGrade: string;
            enrollmentDate: string;
            status: import("@prisma/client").$Enums.EnrollmentStatus;
        }[];
        attendanceSummary: {
            totalSessions: number;
            present: number;
            absent: number;
            late: number;
            excused: number;
            percentage: number;
            perClass: {
                classId: string;
                className: string;
                percentage: number;
                total: number;
                present: number;
            }[];
        };
        recentAttendance: {
            date: string;
            className: string;
            status: import("@prisma/client").$Enums.AttendanceStatus;
        }[];
        progress: any[];
        feedback: {
            id: string;
            date: string;
            className: string;
            teacherName: string;
            content: string;
        }[];
        classHistory: {
            id: string;
            classId: string;
            className: string;
            academicYearName: string;
            action: import("@prisma/client").$Enums.HistoryAction;
            date: string;
        }[];
        createdAt: string;
    }>;
    create(data: {
        name: string;
        parentName: string;
        dob: string;
        contactNumber: string;
        photoFileId?: string | null;
        classIds?: string[];
    }): Promise<{
        id: string;
        name: string;
        parentName: string;
        dob: string;
        age: number;
        contactNumber: string;
        photoFileId: string | null;
        photoUrl: string | null;
        enrollments: {
            id: string;
            classId: string;
            className: string;
            classGrade: string;
            enrollmentDate: string;
            status: import("@prisma/client").$Enums.EnrollmentStatus;
        }[];
        attendanceSummary: {
            totalSessions: number;
            present: number;
            absent: number;
            late: number;
            excused: number;
            percentage: number;
            perClass: {
                classId: string;
                className: string;
                percentage: number;
                total: number;
                present: number;
            }[];
        };
        recentAttendance: {
            date: string;
            className: string;
            status: import("@prisma/client").$Enums.AttendanceStatus;
        }[];
        progress: any[];
        feedback: {
            id: string;
            date: string;
            className: string;
            teacherName: string;
            content: string;
        }[];
        classHistory: {
            id: string;
            classId: string;
            className: string;
            academicYearName: string;
            action: import("@prisma/client").$Enums.HistoryAction;
            date: string;
        }[];
        createdAt: string;
    }>;
    update(id: string, data: {
        name?: string;
        parentName?: string;
        dob?: string;
        contactNumber?: string;
        photoFileId?: string | null;
    }): Promise<{
        id: string;
        name: string;
        parentName: string;
        dob: string;
        age: number;
        contactNumber: string;
        photoFileId: string | null;
        photoUrl: string | null;
        enrollments: {
            id: string;
            classId: string;
            className: string;
            classGrade: string;
            enrollmentDate: string;
            status: import("@prisma/client").$Enums.EnrollmentStatus;
        }[];
        attendanceSummary: {
            totalSessions: number;
            present: number;
            absent: number;
            late: number;
            excused: number;
            percentage: number;
            perClass: {
                classId: string;
                className: string;
                percentage: number;
                total: number;
                present: number;
            }[];
        };
        recentAttendance: {
            date: string;
            className: string;
            status: import("@prisma/client").$Enums.AttendanceStatus;
        }[];
        progress: any[];
        feedback: {
            id: string;
            date: string;
            className: string;
            teacherName: string;
            content: string;
        }[];
        classHistory: {
            id: string;
            classId: string;
            className: string;
            academicYearName: string;
            action: import("@prisma/client").$Enums.HistoryAction;
            date: string;
        }[];
        createdAt: string;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
    addEnrollment(studentId: string, classId: string): Promise<{
        id: string;
        studentId: string;
        classId: string;
        enrollmentDate: string;
        status: import("@prisma/client").$Enums.EnrollmentStatus;
    }>;
    updateEnrollment(enrollmentId: string, status: string): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.EnrollmentStatus;
    }>;
    deleteEnrollment(enrollmentId: string): Promise<{
        success: boolean;
    }>;
    addClassHistory(studentId: string, classId: string, academicYearId: string, action: string): Promise<{
        id: string;
        studentId: string;
        classId: string;
        className: string;
        academicYearId: string;
        academicYearName: string;
        action: import("@prisma/client").$Enums.HistoryAction;
        date: string;
    }>;
}
