import { ApiProperty } from '@nestjs/swagger';

export class DashboardSessionDto {
  @ApiProperty() id: string;
  @ApiProperty() classId: string;
  @ApiProperty() className: string;
  @ApiProperty() date: string;
  @ApiProperty() attendanceSubmitted: boolean;
}

export class PendingSessionDto {
  @ApiProperty() id: string;
  @ApiProperty() classId: string;
  @ApiProperty() className: string;
  @ApiProperty() date: string;
}

export class DashboardFeedbackDto {
  @ApiProperty() id: string;
  @ApiProperty() classSessionId: string;
  @ApiProperty() teacherId: string;
  @ApiProperty() teacherName: string;
  @ApiProperty({ nullable: true, type: String }) studentId: string | null;
  @ApiProperty({ nullable: true, type: String }) studentName: string | null;
  @ApiProperty() content: string;
  @ApiProperty() type: string;
  @ApiProperty() createdAt: string;
}

export class ActiveAcademicYearDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
}

export class DashboardResponseDto {
  @ApiProperty() totalStudents: number;
  @ApiProperty() totalTeachers: number;
  @ApiProperty() activeClasses: number;
  @ApiProperty({ type: () => [DashboardSessionDto] }) todaySessions: DashboardSessionDto[];
  @ApiProperty({ type: () => [PendingSessionDto] }) pendingAttendanceSessions: PendingSessionDto[];
  @ApiProperty({ type: () => [DashboardFeedbackDto] }) recentFeedback: DashboardFeedbackDto[];
  @ApiProperty({ nullable: true, type: () => ActiveAcademicYearDto }) activeAcademicYear: ActiveAcademicYearDto | null;
}
