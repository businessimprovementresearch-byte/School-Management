import { IsUUID, IsOptional } from 'class-validator';

export class AddEnrollmentDto {
  @IsUUID()
  classId: string;

  @IsUUID()
  @IsOptional()
  academicYearId?: string;
}