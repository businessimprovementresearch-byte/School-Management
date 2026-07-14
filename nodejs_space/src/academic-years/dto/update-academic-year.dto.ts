import { IsString, IsDateString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateAcademicYearDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
