import { ApiProperty } from '@nestjs/swagger';

export class ReportCardResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() studentId: string;
  @ApiProperty() studentName: string;
  @ApiProperty() academicYearName: string;
  @ApiProperty({ nullable: true, type: String }) termName: string | null;
  @ApiProperty() pdfFileId: string;
  @ApiProperty() pdfUrl: string;
  @ApiProperty() generatedAt: string;
}
