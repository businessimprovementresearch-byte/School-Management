import { IsString, IsOptional } from 'class-validator';

export class CreateClassDto {
  @IsString()
  name: string;

  @IsString()
  grade: string;

  @IsString()
  @IsOptional()
  description?: string;
}