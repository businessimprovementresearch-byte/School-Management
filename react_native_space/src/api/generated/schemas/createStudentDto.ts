// @ts-nocheck

export interface CreateStudentDto {
  name: string;
  parentName: string;
  dob: string;
  contactNumber: string;
  /** @nullable */
  photoFileId?: string | null;
  classIds?: string[];
}
