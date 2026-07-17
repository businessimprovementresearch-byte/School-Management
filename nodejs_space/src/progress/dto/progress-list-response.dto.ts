import { ApiProperty } from '@nestjs/swagger';

export class ProgressEntryItemDto {
  @ApiProperty() id: string;
  @ApiProperty() date: string;
  @ApiProperty() sessionId: string;
  @ApiProperty() value: number;
  @ApiProperty({ nullable: true, type: String }) notes: string | null;
}

export class ProgressMetricListDto {
  @ApiProperty() metricId: string;
  @ApiProperty() metricName: string;
  @ApiProperty() metricType: string;
  @ApiProperty({ type: () => [ProgressEntryItemDto] }) entries: ProgressEntryItemDto[];
}

export class ProgressListResponseDto {
  @ApiProperty({ type: () => [ProgressMetricListDto] }) metrics: ProgressMetricListDto[];
}
