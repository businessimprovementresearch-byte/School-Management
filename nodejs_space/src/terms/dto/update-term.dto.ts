import { IsString, IsDateString, IsUUID, IsOptional } from 'class-validator';

export class UpdateTermDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsUUID()
  @IsOptional()
  academicYearId?: string;
}
