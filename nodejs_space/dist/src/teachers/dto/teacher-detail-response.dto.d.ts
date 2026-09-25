import { TeacherClassDto } from './teacher-list-response.dto';
export declare class TeacherAttendanceSummaryDto {
    totalSessions: number;
    present: number;
    absent: number;
    percentage: number;
}
export declare class TeachingHistoryYearDto {
    academicYearId: string;
    academicYearName: string;
    classes: TeacherClassDto[];
}
export declare class TeacherDetailResponseDto {
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
    assignedClasses: TeacherClassDto[];
    assignedClassIds: string[];
    teachingHistory: TeachingHistoryYearDto[];
    attendanceSummary: TeacherAttendanceSummaryDto;
    createdAt: string;
}
