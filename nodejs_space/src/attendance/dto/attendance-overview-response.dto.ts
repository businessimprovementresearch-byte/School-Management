import { ApiProperty } from '@nestjs/swagger';

export class SessionSummaryDto {
  @ApiProperty() id: string;
  @ApiProperty() date: string;
  @ApiProperty() attendanceSubmitted: boolean;
}

export class ClassSummaryDto {
  @ApiProperty() totalSessions: number;
  @ApiProperty() averageAttendance: number;
}

export class StudentBreakdownDto {
  @ApiProperty() studentId: string;
  @ApiProperty() studentName: string;
  @ApiProperty() present: number;
  @ApiProperty() absent: number;
  @ApiProperty() late: number;
  @ApiProperty() excused: number;
  @ApiProperty() total: number;
  @ApiProperty() percentage: number;
}

export class AttendanceOverviewResponseDto {
  @ApiProperty({ type: () => [SessionSummaryDto] }) sessions: SessionSummaryDto[];
  @ApiProperty({ type: () => ClassSummaryDto }) classSummary: ClassSummaryDto;
  @ApiProperty({ type: () => [StudentBreakdownDto] }) studentBreakdown: StudentBreakdownDto[];
}
