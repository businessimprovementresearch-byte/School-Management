// @ts-nocheck

export interface CreateMetricDto {
  name: string;
  /** @nullable */
  description?: string | null;
  classId: string;
  type: string;
}
