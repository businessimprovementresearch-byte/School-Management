// @ts-nocheck
import type { StudentListItemDto } from './studentListItemDto';

export interface StudentListResponseDto {
  items: StudentListItemDto[];
  total: number;
  page: number;
  totalPages: number;
}
