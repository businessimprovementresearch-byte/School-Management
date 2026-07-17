// @ts-nocheck
import type { PerClassAttendanceDto } from './perClassAttendanceDto';

export interface AttendanceSummaryDto {
  totalSessions: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  percentage: number;
  perClass: PerClassAttendanceDto[];
}
