// @ts-nocheck
import type { ProgressEntryItemDto } from './progressEntryItemDto';

export interface ProgressMetricInfoDto {
  metricId: string;
  metricName: string;
  metricType: string;
  classId: string;
  className: string;
  entries: ProgressEntryItemDto[];
}
