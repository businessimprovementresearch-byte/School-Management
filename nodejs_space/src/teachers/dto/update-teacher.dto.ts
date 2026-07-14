import { IsString, IsOptional, IsUUID, IsDateString } from 'class-validator';

export class UpdateTeacherDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsDateString()
  @IsOptional()
  dob?: string;

  @IsString()
  @IsOptional()
  contactNumber?: string;

  @IsUUID()
  @IsOptional()
  photoFileId?: string | null;
}
