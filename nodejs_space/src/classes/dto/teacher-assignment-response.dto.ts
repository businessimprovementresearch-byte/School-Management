import { ApiProperty } from '@nestjs/swagger';

export class TeacherAssignmentResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() classId: string;
  @ApiProperty() teacherId: string;
  @ApiProperty() academicYearId: string;
}
