// @ts-nocheck
import type { TeacherClassDto } from './teacherClassDto';

export interface TeacherListItemDto {
  id: string;
  userId: string;
  name: string;
  dob: string;
  age: number;
  contactNumber: string;
  /** @nullable */
  photoFileId: string | null;
  /** @nullable */
  photoUrl: string | null;
  assignedClasses: TeacherClassDto[];
}
