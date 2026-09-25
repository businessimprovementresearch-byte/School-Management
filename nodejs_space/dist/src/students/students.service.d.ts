import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
interface MetricProgressEntry {
    date: string;
    value: number;
    notes: string | null;
}
interface MetricProgressGroup {
    metricId: string;
    metricName: string;
    metricType: string;
    classId: string;
    className: string;
    entries: MetricProgressEntry[];
}
export declare class StudentsService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    private calculateAge;
    findAll(search?: string, classId?: string, page?: number, limit?: number, teacherClassIds?: string[], includeInactive?: boolean): Promise<{
        items: {
            id: string;
            studentIdNumber: string | null;
            name: string;
            nickname: string | null;
            parentName: string | null;
            dob: string | null;
            age: number | null;
            contactNumber: string | null;
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
        studentIdNumber: string | null;
        name: string;
        nickname: string | null;
        isActive: boolean;
        parentName: string | null;
        dob: string | null;
        age: number | null;
        contactNumber: string | null;
        studentContactNumber: string | null;
        remarks: string | null;
        photoFileId: string | null;
        photoUrl: string | null;
        enrollments: {
            id: string;
            classId: string;
            className: string;
            classGrade: string;
            academicYearId: string;
            academicYearName: string;
            enrollmentDate: string;
            status: import("@prisma/client").$Enums.EnrollmentStatus;
        }[];
        attendanceSummary: {
            totalSessions: number;
            present: number;
            absent: number;
            unsure: number;
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
        progress: MetricProgressGroup[];
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
        studentIdNumber?: string;
        name: string;
        nickname?: string;
        parentName?: string;
        dob?: string;
        contactNumber?: string;
        studentContactNumber?: string;
        remarks?: string;
        photoFileId?: string | null;
        classIds?: string[];
    }): Promise<{
        id: string;
        studentIdNumber: string | null;
        name: string;
        nickname: string | null;
        isActive: boolean;
        parentName: string | null;
        dob: string | null;
        age: number | null;
        contactNumber: string | null;
        studentContactNumber: string | null;
        remarks: string | null;
        photoFileId: string | null;
        photoUrl: string | null;
        enrollments: {
            id: string;
            classId: string;
            className: string;
            classGrade: string;
            academicYearId: string;
            academicYearName: string;
            enrollmentDate: string;
            status: import("@prisma/client").$Enums.EnrollmentStatus;
        }[];
        attendanceSummary: {
            totalSessions: number;
            present: number;
            absent: number;
            unsure: number;
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
        progress: MetricProgressGroup[];
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
        studentIdNumber?: string;
        name?: string;
        nickname?: string;
        parentName?: string;
        dob?: string;
        contactNumber?: string;
        studentContactNumber?: string;
        remarks?: string;
        photoFileId?: string | null;
        isActive?: boolean;
    }): Promise<{
        id: string;
        studentIdNumber: string | null;
        name: string;
        nickname: string | null;
        isActive: boolean;
        parentName: string | null;
        dob: string | null;
        age: number | null;
        contactNumber: string | null;
        studentContactNumber: string | null;
        remarks: string | null;
        photoFileId: string | null;
        photoUrl: string | null;
        enrollments: {
            id: string;
            classId: string;
            className: string;
            classGrade: string;
            academicYearId: string;
            academicYearName: string;
            enrollmentDate: string;
            status: import("@prisma/client").$Enums.EnrollmentStatus;
        }[];
        attendanceSummary: {
            totalSessions: number;
            present: number;
            absent: number;
            unsure: number;
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
        progress: MetricProgressGroup[];
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
    addEnrollment(studentId: string, classId: string, academicYearId?: string): Promise<{
        id: string;
        studentId: string;
        classId: string;
        academicYearId: string;
        enrollmentDate: string;
        status: import("@prisma/client").$Enums.EnrollmentStatus;
    }>;
    updateEnrollment(enrollmentId: string, data: {
        status?: string;
        classId?: string;
    }): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.EnrollmentStatus;
        classId: string;
        className: string;
        academicYearId: string;
        academicYearName: string;
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
    setActive(id: string, isActive: boolean): Promise<{
        id: string;
        studentIdNumber: string | null;
        name: string;
        nickname: string | null;
        isActive: boolean;
        parentName: string | null;
        dob: string | null;
        age: number | null;
        contactNumber: string | null;
        studentContactNumber: string | null;
        remarks: string | null;
        photoFileId: string | null;
        photoUrl: string | null;
        enrollments: {
            id: string;
            classId: string;
            className: string;
            classGrade: string;
            academicYearId: string;
            academicYearName: string;
            enrollmentDate: string;
            status: import("@prisma/client").$Enums.EnrollmentStatus;
        }[];
        attendanceSummary: {
            totalSessions: number;
            present: number;
            absent: number;
            unsure: number;
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
        progress: MetricProgressGroup[];
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
}
export {};
