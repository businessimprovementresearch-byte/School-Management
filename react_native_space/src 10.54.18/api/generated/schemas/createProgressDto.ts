// @ts-nocheck

export interface CreateProgressDto {
  studentId: string;
  progressMetricId: string;
  classSessionId: string;
  value: number;
  /** @nullable */
  notes?: string | null;
}
