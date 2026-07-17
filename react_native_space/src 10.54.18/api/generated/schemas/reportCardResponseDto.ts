// @ts-nocheck

export interface ReportCardResponseDto {
  id: string;
  studentId: string;
  studentName: string;
  academicYearName: string;
  /** @nullable */
  termName: string | null;
  pdfFileId: string;
  pdfUrl: string;
  generatedAt: string;
}
