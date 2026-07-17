import { ApiProperty } from '@nestjs/swagger';

export class BulkCreateSessionsResponseDto {
  @ApiProperty() success: boolean;
  @ApiProperty() date: string;
  @ApiProperty() totalClasses: number;
  @ApiProperty() createdCount: number;
  @ApiProperty() skippedCount: number;
  @ApiProperty({ type: () => [String] }) createdClassNames: string[];
  @ApiProperty({ type: () => [String] }) skippedClassNames: string[];
}