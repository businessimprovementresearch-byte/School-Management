// @ts-nocheck

export interface EventListItemDto {
  id: string;
  name: string;
  /** @nullable */
  description: string | null;
  date: string;
  /** @nullable */
  location: string | null;
  participantCount: number;
  groupCount: number;
}
