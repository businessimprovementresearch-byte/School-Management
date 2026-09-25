// @ts-nocheck
import type { TeacherAttendanceSummaryDto } from './teacherAttendanceSummaryDto';
import type { TeacherClassDto } from './teacherClassDto';
import type { TeachingHistoryYearDto } from './teachingHistoryYearDto';

export interface TeacherDetailResponseDto {
  id: string;
  userId: string;
  name: string;
  /** @nullable */
  nickname: string | null;
  email: string;
  isActive: boolean;
  /** @nullable */
  dob: string | null;
  /** @nullable */
  age: number | null;
  /** @nullable */
  contactNumber: string | null;
  /** @nullable */
  remarks: string | null;
  /** @nullable */
  photoFileId: string | null;
  /** @nullable */
  photoUrl: string | null;
  assignedClasses: TeacherClassDto[];
  assignedClassIds: string[];
  teachingHistory: TeachingHistoryYearDto[];
  attendanceSummary: TeacherAttendanceSummaryDto;
  createdAt: string;
}
