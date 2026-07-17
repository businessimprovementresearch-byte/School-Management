// @ts-nocheck
import type { EnrolledClassDto } from './enrolledClassDto';

export interface StudentListItemDto {
  id: string;
  name: string;
  parentName: string;
  dob: string;
  age: number;
  contactNumber: string;
  /** @nullable */
  photoFileId: string | null;
  /** @nullable */
  photoUrl: string | null;
  enrolledClasses: EnrolledClassDto[];
}
