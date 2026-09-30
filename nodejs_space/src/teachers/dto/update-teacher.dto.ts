import { IsString, IsEmail, IsOptional, IsDateString, IsArray, IsUUID, MinLength } from 'class-validator';

export class UpdateTeacherDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsDateString()
  @IsOptional()
  dob?: string;

  @IsString()
  @IsOptional()
  contactNumber?: string;

  @IsString()
  @IsOptional()
  remarks?: string;

  @IsUUID()
  @IsOptional()
  photoFileId?: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  classIds?: string[];
}