// @ts-nocheck

export interface ProgressResponseDto {
  id: string;
  studentId: string;
  progressMetricId: string;
  classSessionId: string;
  value: number;
  /** @nullable */
  notes: string | null;
  createdAt: string;
}
