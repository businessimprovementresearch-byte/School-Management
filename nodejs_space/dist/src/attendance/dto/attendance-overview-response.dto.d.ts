export declare class SessionSummaryDto {
    id: string;
    date: string;
    attendanceSubmitted: boolean;
}
export declare class ClassSummaryDto {
    totalSessions: number;
    averageAttendance: number;
}
export declare class StudentBreakdownDto {
    studentId: string;
    studentName: string;
    present: number;
    absent: number;
    late: number;
    excused: number;
    total: number;
    percentage: number;
}
export declare class AttendanceOverviewResponseDto {
    sessions: SessionSummaryDto[];
    classSummary: ClassSummaryDto;
    studentBreakdown: StudentBreakdownDto[];
}
