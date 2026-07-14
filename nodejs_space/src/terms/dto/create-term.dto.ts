import { IsString, IsDateString, IsUUID } from 'class-validator';

export class CreateTermDto {
  @IsString()
  name: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsUUID()
  academicYearId: string;
}
