import { ApiProperty } from '@nestjs/swagger';

export class ProgressResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() studentId: string;
  @ApiProperty() progressMetricId: string;
  @ApiProperty() classSessionId: string;
  @ApiProperty() value: number;
  @ApiProperty({ nullable: true, type: String }) notes: string | null;
  @ApiProperty() createdAt: string;
}
