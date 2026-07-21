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

export class ProgressClassGroupDto {
  @ApiProperty() classId: string;
  @ApiProperty() className: string;
  @ApiProperty({ type: () => [ProgressMetricListDto] }) metrics: ProgressMetricListDto[];
}

export class ProgressYearGroupDto {
  @ApiProperty() academicYearId: string;
  @ApiProperty() academicYearName: string;
  @ApiProperty({ type: () => [ProgressClassGroupDto] }) classes: ProgressClassGroupDto[];
}

export class ProgressListResponseDto {
  @ApiProperty({ type: () => [ProgressYearGroupDto] }) years: ProgressYearGroupDto[];
}