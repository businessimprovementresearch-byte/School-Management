// @ts-nocheck

export interface ClassAttendanceByDateDto {
  classId: string;
  className: string;
  grade: string;
  /** @nullable */
  sessionId: string | null;
  attendanceSubmitted: boolean;
  totalStudents: number;
  present: number;
  absent: number;
  unsure: number;
}