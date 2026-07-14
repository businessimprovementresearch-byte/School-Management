export declare class SessionStudentDto {
    id: string;
    name: string;
    photoFileId: string | null;
    photoUrl: string | null;
    attendanceStatus: string | null;
}
export declare class SessionTeacherAttendanceDto {
    teacherId: string;
    teacherName: string;
    status: string | null;
}
export declare class SessionFeedbackDto {
    id: string;
    teacherName: string;
    content: string;
    type: string;
    studentId: string | null;
    studentName: string | null;
    createdAt: string;
}
export declare class SessionDetailResponseDto {
    id: string;
    classId: string;
    className: string;
    classGrade: string;
    date: string;
    academicYearId: string;
    academicYearName: string;
    termId: string | null;
    termName: string | null;
    attendanceSubmitted: boolean;
    students: SessionStudentDto[];
    teacherAttendance: SessionTeacherAttendanceDto[];
    feedback: SessionFeedbackDto[];
}
