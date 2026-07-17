import { IsString, IsDateString } from 'class-validator';

export class CreateAcademicYearDto {
  @IsString()
  name: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
