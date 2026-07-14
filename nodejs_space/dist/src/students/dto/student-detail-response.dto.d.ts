export declare class EnrollmentInfoDto {
    id: string;
    classId: string;
    className: string;
    classGrade: string;
    enrollmentDate: string;
    status: string;
}
export declare class PerClassAttendanceDto {
    classId: string;
    className: string;
    percentage: number;
    total: number;
    present: number;
}
export declare class AttendanceSummaryDto {
    totalSessions: number;
    present: number;
    absent: number;
    late: number;
    excused: number;
    percentage: number;
    perClass: PerClassAttendanceDto[];
}
export declare class RecentAttendanceDto {
    date: string;
    className: string;
    status: string;
}
export declare class ProgressEntryDto {
    date: string;
    value: number;
    notes: string | null;
}
export declare class ProgressInfoDto {
    metricId: string;
    metricName: string;
    metricType: string;
    classId: string;
    className: string;
    entries: ProgressEntryDto[];
}
export declare class FeedbackInfoDto {
    id: string;
    date: string;
    className: string;
    teacherName: string;
    content: string;
}
export declare class ClassHistoryInfoDto {
    id: string;
    classId: string;
    className: string;
    academicYearName: string;
    action: string;
    date: string;
}
export declare class StudentDetailResponseDto {
    id: string;
    name: string;
    parentName: string;
    dob: string;
    age: number;
    contactNumber: string;
    photoFileId: string | null;
    photoUrl: string | null;
    enrollments: EnrollmentInfoDto[];
    attendanceSummary: AttendanceSummaryDto;
    recentAttendance: RecentAttendanceDto[];
    progress: ProgressInfoDto[];
    feedback: FeedbackInfoDto[];
    classHistory: ClassHistoryInfoDto[];
    createdAt: string;
}
