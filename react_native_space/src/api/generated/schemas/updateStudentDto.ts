// @ts-nocheck

export interface UpdateStudentDto {
  name?: string;
  nickname?: string;
  parentName?: string;
  dob?: string;
  contactNumber?: string;
  /** @nullable */
  photoFileId?: string | null;
}
