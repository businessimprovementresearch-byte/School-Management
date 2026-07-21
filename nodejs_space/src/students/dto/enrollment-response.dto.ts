import { ApiProperty } from '@nestjs/swagger';

export class EnrollmentResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() studentId: string;
  @ApiProperty() classId: string;
  @ApiProperty() academicYearId: string;
  @ApiProperty() enrollmentDate: string;
  @ApiProperty() status: string;
}

export class UpdateEnrollmentResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() status: string;
}
