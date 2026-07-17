import { ApiProperty } from '@nestjs/swagger';

export class PresignedUploadResponseDto {
  @ApiProperty() uploadUrl: string;
  @ApiProperty() cloud_storage_path: string;
}
