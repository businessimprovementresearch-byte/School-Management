// @ts-nocheck
import type { ActiveAcademicYearDto } from './activeAcademicYearDto';
import type { DashboardFeedbackDto } from './dashboardFeedbackDto';
import type { DashboardSessionDto } from './dashboardSessionDto';
import type { PendingSessionDto } from './pendingSessionDto';

export interface DashboardResponseDto {
  totalStudents: number;
  totalTeachers: number;
  activeClasses: number;
  todaySessions: DashboardSessionDto[];
  pendingAttendanceSessions: PendingSessionDto[];
  recentFeedback: DashboardFeedbackDto[];
  /** @nullable */
  activeAcademicYear: ActiveAcademicYearDto | null;
}
