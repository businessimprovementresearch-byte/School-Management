// @ts-nocheck

export interface AlbumListItemDto {
  id: string;
  title: string;
  /** @nullable */
  description: string | null;
  /** @nullable */
  className: string | null;
  /** @nullable */
  eventName: string | null;
  photoCount: number;
  /** @nullable */
  coverUrl: string | null;
  createdAt: string;
}
