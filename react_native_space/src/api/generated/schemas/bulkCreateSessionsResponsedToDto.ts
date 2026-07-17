// @ts-nocheck

export interface BulkCreateSessionsResponseDto {
  success: boolean;
  date: string;
  totalClasses: number;
  createdCount: number;
  skippedCount: number;
  createdClassNames: string[];
  skippedClassNames: string[];
}