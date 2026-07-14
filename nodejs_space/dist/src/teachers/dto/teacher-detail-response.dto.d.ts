import { TeacherClassDto } from './teacher-list-response.dto';
export declare class TeacherAttendanceSummaryDto {
    totalSessions: number;
    present: number;
    absent: number;
    percentage: number;
}
export declare class TeacherDetailResponseDto {
    id: string;
    userId: string;
    name: string;
    dob: string;
    age: number;
    contactNumber: string;
    photoFileId: string | null;
    photoUrl: string | null;
    assignedClasses: TeacherClassDto[];
    attendanceSummary: TeacherAttendanceSummaryDto;
    createdAt: string;
}
