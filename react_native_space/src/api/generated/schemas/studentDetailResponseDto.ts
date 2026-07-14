// @ts-nocheck
import type { AttendanceSummaryDto } from './attendanceSummaryDto';
import type { ClassHistoryInfoDto } from './classHistoryInfoDto';
import type { EnrollmentInfoDto } from './enrollmentInfoDto';
import type { FeedbackInfoDto } from './feedbackInfoDto';
import type { ProgressInfoDto } from './progressInfoDto';
import type { RecentAttendanceDto } from './recentAttendanceDto';

export interface StudentDetailResponseDto {
  id: string;
  name: string;
  parentName: string;
  dob: string;
  age: number;
  contactNumber: string;
  /** @nullable */
  photoFileId: string | null;
  /** @nullable */
  photoUrl: string | null;
  enrollments: EnrollmentInfoDto[];
  attendanceSummary: AttendanceSummaryDto;
  recentAttendance: RecentAttendanceDto[];
  progress: ProgressInfoDto[];
  feedback: FeedbackInfoDto[];
  classHistory: ClassHistoryInfoDto[];
  createdAt: string;
}
