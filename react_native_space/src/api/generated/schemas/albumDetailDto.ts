// @ts-nocheck
import type { GalleryPhotoDto } from './galleryPhotoDto';

export interface AlbumDetailDto {
  id: string;
  title: string;
  /** @nullable */
  description: string | null;
  /** @nullable */
  className: string | null;
  /** @nullable */
  eventName: string | null;
  photos: GalleryPhotoDto[];
}
