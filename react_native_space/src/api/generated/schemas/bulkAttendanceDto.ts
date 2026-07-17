// @ts-nocheck
import type { StudentAttendanceEntry } from './studentAttendanceEntry';
import type { TeacherAttendanceEntry } from './teacherAttendanceEntry';

export interface BulkAttendanceDto {
  sessionId: string;
  studentAttendance: StudentAttendanceEntry[];
  teacherAttendance?: TeacherAttendanceEntry[];
}
