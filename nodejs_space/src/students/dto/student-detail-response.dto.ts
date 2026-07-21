import { ApiProperty } from '@nestjs/swagger';

export class EnrollmentInfoDto {
  @ApiProperty() id: string;
  @ApiProperty() classId: string;
  @ApiProperty() className: string;
  @ApiProperty() classGrade: string;
  @ApiProperty() academicYearId: string;
  @ApiProperty() academicYearName: string;
  @ApiProperty() enrollmentDate: string;
  @ApiProperty() status: string;
}

export class PerClassAttendanceDto {
  @ApiProperty() classId: string;
  @ApiProperty() className: string;
  @ApiProperty() percentage: number;
  @ApiProperty() total: number;
  @ApiProperty() present: number;
}

export class AttendanceSummaryDto {
  @ApiProperty() totalSessions: number;
  @ApiProperty() present: number;
  @ApiProperty() absent: number;
  @ApiProperty() late: number;
  @ApiProperty() excused: number;
  @ApiProperty() percentage: number;
  @ApiProperty({ type: () => [PerClassAttendanceDto] }) perClass: PerClassAttendanceDto[];
}

export class RecentAttendanceDto {
  @ApiProperty() date: string;
  @ApiProperty() className: string;
  @ApiProperty() status: string;
}

export class ProgressEntryDto {
  @ApiProperty() date: string;
  @ApiProperty() value: number;
  @ApiProperty({ nullable: true, type: String }) notes: string | null;
}

export class ProgressInfoDto {
  @ApiProperty() metricId: string;
  @ApiProperty() metricName: string;
  @ApiProperty() metricType: string;
  @ApiProperty() classId: string;
  @ApiProperty() className: string;
  @ApiProperty({ type: () => [ProgressEntryDto] }) entries: ProgressEntryDto[];
}

export class FeedbackInfoDto {
  @ApiProperty() id: string;
  @ApiProperty() date: string;
  @ApiProperty() className: string;
  @ApiProperty() teacherName: string;
  @ApiProperty() content: string;
}

export class ClassHistoryInfoDto {
  @ApiProperty() id: string;
  @ApiProperty() classId: string;
  @ApiProperty() className: string;
  @ApiProperty() academicYearName: string;
  @ApiProperty() action: string;
  @ApiProperty() date: string;
}

export class StudentDetailResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty({ nullable: true, type: String }) nickname: string | null;
  @ApiProperty() parentName: string;
  @ApiProperty() dob: string;
  @ApiProperty() age: number;
  @ApiProperty() contactNumber: string;
  @ApiProperty({ nullable: true, type: String }) photoFileId: string | null;
  @ApiProperty({ nullable: true, type: String }) photoUrl: string | null;
  @ApiProperty({ type: () => [EnrollmentInfoDto] }) enrollments: EnrollmentInfoDto[];
  @ApiProperty({ type: () => AttendanceSummaryDto }) attendanceSummary: AttendanceSummaryDto;
  @ApiProperty({ type: () => [RecentAttendanceDto] }) recentAttendance: RecentAttendanceDto[];
  @ApiProperty({ type: () => [ProgressInfoDto] }) progress: ProgressInfoDto[];
  @ApiProperty({ type: () => [FeedbackInfoDto] }) feedback: FeedbackInfoDto[];
  @ApiProperty({ type: () => [ClassHistoryInfoDto] }) classHistory: ClassHistoryInfoDto[];
  @ApiProperty() createdAt: string;
}
