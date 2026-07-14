import { ApiProperty } from '@nestjs/swagger';

export class MetricResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty({ nullable: true, type: String }) description: string | null;
  @ApiProperty() classId: string;
  @ApiProperty() type: string;
}

export class MetricListItemDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty({ nullable: true, type: String }) description: string | null;
  @ApiProperty() classId: string;
  @ApiProperty() className: string;
  @ApiProperty() type: string;
}
