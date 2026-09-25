// @ts-nocheck

export interface ProgressEntryItemDto {
  id: string;
  date: string;
  sessionId: string;
  value: number;
  /** @nullable */
  notes: string | null;
}
