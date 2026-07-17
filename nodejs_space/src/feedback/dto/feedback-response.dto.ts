import { ApiProperty } from '@nestjs/swagger';

export class FeedbackResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() classSessionId: string;
  @ApiProperty() teacherId: string;
  @ApiProperty() teacherName: string;
  @ApiProperty({ nullable: true, type: String }) studentId: string | null;
  @ApiProperty({ nullable: true, type: String }) studentName: string | null;
  @ApiProperty() content: string;
  @ApiProperty() type: string;
  @ApiProperty() createdAt: string;
}
