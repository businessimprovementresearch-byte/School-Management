import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class PresignedUploadDto {
  @IsString()
  fileName: string;

  @IsString()
  contentType: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}
