import { ApiProperty } from '@nestjs/swagger';

export class ClassHistoryResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() studentId: string;
  @ApiProperty() classId: string;
  @ApiProperty() className: string;
  @ApiProperty() academicYearId: string;
  @ApiProperty() academicYearName: string;
  @ApiProperty() action: string;
  @ApiProperty() date: string;
}
