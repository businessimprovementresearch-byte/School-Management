// @ts-nocheck
import type { ProgressEntryItemDto } from './progressEntryItemDto';

export interface ProgressMetricListDto {
  metricId: string;
  metricName: string;
  metricType: string;
  entries: ProgressEntryItemDto[];
}
