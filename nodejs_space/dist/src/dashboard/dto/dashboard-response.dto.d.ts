export declare class DashboardSessionDto {
    id: string;
    classId: string;
    className: string;
    date: string;
    attendanceSubmitted: boolean;
}
export declare class PendingSessionDto {
    id: string;
    classId: string;
    className: string;
    date: string;
}
export declare class DashboardFeedbackDto {
    id: string;
    classSessionId: string;
    teacherId: string;
    teacherName: string;
    studentId: string | null;
    studentName: string | null;
    content: string;
    type: string;
    createdAt: string;
}
export declare class ActiveAcademicYearDto {
    id: string;
    name: string;
}
export declare class DashboardResponseDto {
    totalStudents: number;
    totalTeachers: number;
    activeClasses: number;
    todaySessions: DashboardSessionDto[];
    pendingAttendanceSessions: PendingSessionDto[];
    recentFeedback: DashboardFeedbackDto[];
    activeAcademicYear: ActiveAcademicYearDto | null;
}
