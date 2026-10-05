// @ts-nocheck
import type { EnrolledClassDto } from './enrolledClassDto';

export interface StudentListItemDto {
  id: string;
  isActive: boolean;
  name: string;
  /** @nullable */
  nickname: string | null;
  /** @nullable */
  parentName: string | null;
  /** @nullable */
  dob: string | null;
  /** @nullable */
  age: number | null;
  /** @nullable */
  contactNumber: string | null;
  /** @nullable */
  photoFileId: string | null;
  /** @nullable */
  photoUrl: string | null;
  enrolledClasses: EnrolledClassDto[];
  /** @nullable */
  studentIdNumber: string | null;
}
