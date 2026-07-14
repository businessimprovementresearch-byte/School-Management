import { ApiProperty } from '@nestjs/swagger';

export class TermResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() startDate: string;
  @ApiProperty() endDate: string;
  @ApiProperty() academicYearId: string;
}

export class TermListItemDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() startDate: string;
  @ApiProperty() endDate: string;
  @ApiProperty() academicYearId: string;
  @ApiProperty() academicYearName: string;
}
