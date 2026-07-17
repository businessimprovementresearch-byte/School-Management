import { ApiProperty } from '@nestjs/swagger';

export class CompleteUploadResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() cloud_storage_path: string;
  @ApiProperty() fileName: string;
}
