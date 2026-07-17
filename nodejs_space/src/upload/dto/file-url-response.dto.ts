import { ApiProperty } from '@nestjs/swagger';

export class FileUrlResponseDto {
  @ApiProperty() url: string;
}
