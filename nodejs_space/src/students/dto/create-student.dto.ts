import { IsString, IsOptional, IsArray, IsUUID, IsDateString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsString()
  parentName: string;

  @IsDateString()
  dob: string;

  @IsString()
  contactNumber: string;

  @IsUUID()
  @IsOptional()
  photoFileId?: string | null;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  classIds?: string[];
}
