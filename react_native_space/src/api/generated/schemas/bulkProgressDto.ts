// @ts-nocheck
import type { ProgressScoreEntry } from './progressScoreEntry';

export interface BulkProgressDto {
  classSessionId: string;
  progressMetricId: string;
  entries: ProgressScoreEntry[];
}
