import { IsUUID, IsEnum } from 'class-validator';

export class AddClassHistoryDto {
  @IsUUID()
  classId: string;

  @IsUUID()
  academicYearId: string;

  @IsEnum(['ENROLLED', 'PROMOTED', 'GRADUATED'])
  action: string;
}
