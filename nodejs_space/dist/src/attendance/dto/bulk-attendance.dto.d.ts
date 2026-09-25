export declare class StudentAttendanceEntry {
    studentId: string;
    status: string;
}
export declare class TeacherAttendanceEntry {
    teacherId: string;
    status: string;
}
export declare class BulkAttendanceDto {
    sessionId: string;
    studentAttendance: StudentAttendanceEntry[];
    teacherAttendance?: TeacherAttendanceEntry[];
}
