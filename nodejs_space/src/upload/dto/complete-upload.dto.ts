import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CompleteUploadDto {
  @IsString()
  cloud_storage_path: string;

  @IsString()
  fileName: string;

  @IsString()
  contentType: string;

  @IsNumber()
  @IsOptional()
  fileSize?: number;
}
