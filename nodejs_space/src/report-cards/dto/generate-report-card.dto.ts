import { IsUUID, IsOptional } from 'class-validator';

export class GenerateReportCardDto {
  @IsUUID()
  studentId: string;

  @IsUUID()
  academicYearId: string;

  @IsUUID()
  @IsOptional()
  termId?: string | null;
}
