import { IsString, IsOptional, IsUUID, IsDateString } from 'class-validator';

export class UpdateStudentDto {

  @IsString()
  @IsOptional()
  studentIdNumber?: string;

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

  @IsString()
  @IsOptional()
  studentContactNumber?: string;

  @IsString()
  @IsOptional()
  remarks?: string;

  @IsUUID()
  @IsOptional()
  photoFileId?: string | null;
}
