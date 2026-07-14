// @ts-nocheck
import type { ProgressEntryDto } from './progressEntryDto';

export interface ProgressInfoDto {
  metricId: string;
  metricName: string;
  metricType: string;
  classId: string;
  className: string;
  entries: ProgressEntryDto[];
}
