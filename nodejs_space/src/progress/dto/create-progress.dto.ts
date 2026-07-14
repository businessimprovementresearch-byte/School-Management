import { IsUUID, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateProgressDto {
  @IsUUID()
  studentId: string;

  @IsUUID()
  progressMetricId: string;

  @IsUUID()
  classSessionId: string;

  @IsNumber()
  value: number;

  @IsString()
  @IsOptional()
  notes?: string | null;
}
