import { ApiProperty } from '@nestjs/swagger';

export class BulkAttendanceResponseDto {
  @ApiProperty() success: boolean;
  @ApiProperty() savedCount: number;
}
