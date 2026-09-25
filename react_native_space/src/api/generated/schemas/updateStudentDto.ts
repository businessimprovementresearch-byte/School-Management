// @ts-nocheck

export interface UpdateStudentDto {
  studentIdNumber?: string;
  name?: string;
  nickname?: string;
  parentName?: string;
  dob?: string;
  contactNumber?: string;
  studentContactNumber?: string;
  remarks?: string;
  /** @nullable */
  photoFileId?: string | null;
  isActive?: boolean;
}
