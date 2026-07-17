import { ApiProperty } from '@nestjs/swagger';

export class SessionStudentDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty({ nullable: true, type: String }) photoFileId: string | null;
  @ApiProperty({ nullable: true, type: String }) photoUrl: string | null;
  @ApiProperty({ nullable: true, type: String }) attendanceStatus: string | null;
}

export class SessionTeacherAttendanceDto {
  @ApiProperty() teacherId: string;
  @ApiProperty() teacherName: string;
  @ApiProperty({ nullable: true, type: String }) status: string | null;
}

export class SessionFeedbackDto {
  @ApiProperty() id: string;
  @ApiProperty() teacherName: string;
  @ApiProperty() content: string;
  @ApiProperty() type: string;
  @ApiProperty({ nullable: true, type: String }) studentId: string | null;
  @ApiProperty({ nullable: true, type: String }) studentName: string | null;
  @ApiProperty() createdAt: string;
}

export class SessionDetailResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() classId: string;
  @ApiProperty() className: string;
  @ApiProperty() classGrade: string;
  @ApiProperty() date: string;
  @ApiProperty() academicYearId: string;
  @ApiProperty() academicYearName: string;
  @ApiProperty({ nullable: true, type: String }) termId: string | null;
  @ApiProperty({ nullable: true, type: String }) termName: string | null;
  @ApiProperty() attendanceSubmitted: boolean;
  @ApiProperty({ type: () => [SessionStudentDto] }) students: SessionStudentDto[];
  @ApiProperty({ type: () => [SessionTeacherAttendanceDto] }) teacherAttendance: SessionTeacherAttendanceDto[];
  @ApiProperty({ type: () => [SessionFeedbackDto] }) feedback: SessionFeedbackDto[];
}
