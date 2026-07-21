import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export class UpdateEnrollmentDto {
  @IsEnum(['ACTIVE', 'COMPLETED', 'WITHDRAWN'])
  @IsOptional()
  status?: string;

  @IsUUID()
  @IsOptional()
  classId?: string;
}