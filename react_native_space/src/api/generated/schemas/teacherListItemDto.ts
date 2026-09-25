// @ts-nocheck
import type { TeacherClassDto } from './teacherClassDto';

export interface TeacherListItemDto {
  id: string;
  userId: string;
  name: string;
  /** @nullable */
  nickname: string | null;
  isActive: boolean;
  email: string;
  /** @nullable */
  dob: string | null;
  /** @nullable */
  age: number | null;
  /** @nullable */
  contactNumber: string | null;
  /** @nullable */
  remarks: string | null;
  /** @nullable */
  photoFileId: string | null;
  /** @nullable */
  photoUrl: string | null;
  assignedClasses: TeacherClassDto[];
}
