import { IsUUID, IsDateString, IsOptional } from 'class-validator';

export class BulkCreateSessionsDto {
  @IsDateString()
  date: string;

  @IsUUID()
  @IsOptional()
  academicYearId?: string;

  @IsUUID()
  @IsOptional()
  termId?: string;
}