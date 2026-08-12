import { IsUUID, IsArray, ValidateNested, IsNumber, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ProgressScoreEntry {
  @IsUUID()
  studentId: string;

  @IsNumber()
  value: number;

  @IsString()
  @IsOptional()
  notes?: string | null;
}

export class BulkProgressDto {
  @IsUUID()
  classSessionId: string;

  @IsUUID()
  progressMetricId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProgressScoreEntry)
  entries: ProgressScoreEntry[];
}