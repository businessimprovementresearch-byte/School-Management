// @ts-nocheck

export interface AwardListItemDto {
  id: string;
  name: string;
  /** @nullable */
  description: string | null;
  /** @nullable */
  icon: string | null;
  issuedCount: number;
}
