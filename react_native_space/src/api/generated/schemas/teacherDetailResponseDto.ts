// @ts-nocheck
import type { TeacherAttendanceSummaryDto } from './teacherAttendanceSummaryDto';
import type { TeacherClassDto } from './teacherClassDto';

export interface TeacherDetailResponseDto {
  id: string;
  userId: string;
  name: string;
  dob: string;
  age: number;
  contactNumber: string;
  /** @nullable */
  photoFileId: string | null;
  /** @nullable */
  photoUrl: string | null;
  assignedClasses: TeacherClassDto[];
  attendanceSummary: TeacherAttendanceSummaryDto;
  createdAt: string;
}
