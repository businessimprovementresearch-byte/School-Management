import { IsUUID, IsDateString, IsOptional } from 'class-validator';

export class CreateSessionDto {
  @IsUUID()
  classId: string;

  @IsDateString()
  date: string;

  @IsUUID()
  academicYearId: string;

  @IsUUID()
  @IsOptional()
  termId?: string | null;
}
