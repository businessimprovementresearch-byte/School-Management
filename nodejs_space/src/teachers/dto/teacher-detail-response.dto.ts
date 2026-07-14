import { ApiProperty } from '@nestjs/swagger';
import { TeacherClassDto } from './teacher-list-response.dto';

export class TeacherAttendanceSummaryDto {
  @ApiProperty() totalSessions: number;
  @ApiProperty() present: number;
  @ApiProperty() absent: number;
  @ApiProperty() percentage: number;
}

export class TeacherDetailResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() userId: string;
  @ApiProperty() name: string;
  @ApiProperty() dob: string;
  @ApiProperty() age: number;
  @ApiProperty() contactNumber: string;
  @ApiProperty({ nullable: true, type: String }) photoFileId: string | null;
  @ApiProperty({ nullable: true, type: String }) photoUrl: string | null;
  @ApiProperty({ type: () => [TeacherClassDto] }) assignedClasses: TeacherClassDto[];
  @ApiProperty({ type: () => TeacherAttendanceSummaryDto }) attendanceSummary: TeacherAttendanceSummaryDto;
  @ApiProperty() createdAt: string;
}
