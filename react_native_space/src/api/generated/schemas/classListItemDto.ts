// @ts-nocheck
import type { ClassTeacherDto } from './classTeacherDto';

export interface ClassListItemDto {
  id: string;
  name: string;
  grade: string;
  /** @nullable */
  description: string | null;
  studentCount: number;
  teachers: ClassTeacherDto[];
  /** @nullable */
  nextSessionDate: string | null;
}
