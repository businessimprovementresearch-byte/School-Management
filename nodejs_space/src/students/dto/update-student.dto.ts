import { IsString, IsOptional, IsUUID, IsDateString } from 'class-validator';

export class UpdateStudentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  nickname?: string;

  @IsString()
  @IsOptional()
  parentName?: string;

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
