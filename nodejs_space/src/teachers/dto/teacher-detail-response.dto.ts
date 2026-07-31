import { ApiProperty } from '@nestjs/swagger';
import { TeacherClassDto } from './teacher-list-response.dto';

export class TeacherAttendanceSummaryDto {
  @ApiProperty() totalSessions: number;
  @ApiProperty() present: number;
  @ApiProperty() absent: number;
  @ApiProperty() percentage: number;
}

export class TeachingHistoryYearDto {
    @ApiProperty() academicYearId: string;
    @ApiProperty() academicYearName: string;
    @ApiProperty({ type: () => [TeacherClassDto] }) classes: TeacherClassDto[];
  }

export class TeacherDetailResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() userId: string;
  @ApiProperty() name: string;
  @ApiProperty({ nullable: true, type: String }) dob: string | null;
  @ApiProperty({ nullable: true, type: Number }) age: number | null;
  @ApiProperty({ nullable: true, type: String }) contactNumber: string | null;
  @ApiProperty({ nullable: true, type: String }) remarks: string | null;
  @ApiProperty({ nullable: true, type: String }) photoFileId: string | null;
  @ApiProperty({ nullable: true, type: String }) photoUrl: string | null;
  @ApiProperty({ type: () => [TeacherClassDto] }) assignedClasses: TeacherClassDto[];
  @ApiProperty({ type: () => [TeachingHistoryYearDto] }) teachingHistory: TeachingHistoryYearDto[];
  @ApiProperty({ type: () => TeacherAttendanceSummaryDto }) attendanceSummary: TeacherAttendanceSummaryDto;
  @ApiProperty() createdAt: string;
}
