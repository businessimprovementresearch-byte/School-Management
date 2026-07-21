import { IsUUID, IsOptional } from 'class-validator';

export class AssignTeacherDto {
  @IsUUID()
  teacherId: string;

  @IsUUID()
  @IsOptional()
  academicYearId?: string;
}