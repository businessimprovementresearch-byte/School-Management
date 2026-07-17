// @ts-nocheck
import type { ClassSummaryDto } from './classSummaryDto';
import type { SessionSummaryDto } from './sessionSummaryDto';
import type { StudentBreakdownDto } from './studentBreakdownDto';

export interface AttendanceOverviewResponseDto {
  sessions: SessionSummaryDto[];
  classSummary: ClassSummaryDto;
  studentBreakdown: StudentBreakdownDto[];
}
