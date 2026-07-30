import { ApiProperty } from '@nestjs/swagger';
import { ClassTeacherDto } from './class-list-response.dto';

export class ClassStudentDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty({ nullable: true, type: String }) photoFileId: string | null;
  @ApiProperty({ nullable: true, type: String }) photoUrl: string | null;
  @ApiProperty() enrollmentStatus: string;
}

export class ClassSessionInfoDto {
  @ApiProperty() id: string;
  @ApiProperty() date: string;
  @ApiProperty() attendanceSubmitted: boolean;
  @ApiProperty() isHoliday: boolean;
  @ApiProperty({ nullable: true, type: String }) termName: string | null;
}

export class ClassMetricInfoDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() type: string;
  @ApiProperty({ nullable: true, type: String }) description: string | null;
}

export class ClassDetailResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() grade: string;
  @ApiProperty({ nullable: true, type: String }) description: string | null;
  @ApiProperty({ type: () => [ClassTeacherDto] }) teachers: ClassTeacherDto[];
  @ApiProperty({ type: () => [ClassStudentDto] }) students: ClassStudentDto[];
  @ApiProperty({ type: () => [ClassSessionInfoDto] }) sessions: ClassSessionInfoDto[];
  @ApiProperty({ type: () => [ClassMetricInfoDto] }) metrics: ClassMetricInfoDto[];
}
