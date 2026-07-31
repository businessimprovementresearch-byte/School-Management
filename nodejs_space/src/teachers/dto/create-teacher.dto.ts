import { IsString, IsEmail, MinLength, IsOptional, IsArray, IsUUID, IsDateString } from 'class-validator';

export class CreateTeacherDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsDateString()
  @IsOptional()
  dob?: string;

  @IsString()
  @IsOptional()
  contactNumber?: string;

  @IsString()
  @IsOptional()
  contactNumber?: string;

  @IsUUID()
  @IsOptional()
  photoFileId?: string | null;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  classIds?: string[];
}
