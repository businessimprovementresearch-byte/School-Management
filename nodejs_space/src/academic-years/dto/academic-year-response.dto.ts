import { ApiProperty } from '@nestjs/swagger';

export class AcademicYearResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() startDate: string;
  @ApiProperty() endDate: string;
  @ApiProperty() isActive: boolean;
}

export class AcademicYearListItemDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() startDate: string;
  @ApiProperty() endDate: string;
  @ApiProperty() isActive: boolean;
  @ApiProperty() createdAt: string;
}
