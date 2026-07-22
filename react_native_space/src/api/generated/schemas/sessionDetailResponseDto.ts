// @ts-nocheck
import type { SessionFeedbackDto } from './sessionFeedbackDto';
import type { SessionStudentDto } from './sessionStudentDto';
import type { SessionTeacherAttendanceDto } from './sessionTeacherAttendanceDto';

export interface SessionDetailResponseDto {
  id: string;
  classId: string;
  className: string;
  classGrade: string;
  date: string;
  academicYearId: string;
  academicYearName: string;
  /** @nullable */
  termId: string | null;
  /** @nullable */
  termName: string | null;
  attendanceSubmitted: boolean;
  isHoliday: boolean;
  students: SessionStudentDto[];
  teacherAttendance: SessionTeacherAttendanceDto[];
  feedback: SessionFeedbackDto[];
}
