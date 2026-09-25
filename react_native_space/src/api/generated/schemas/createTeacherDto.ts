// @ts-nocheck

export interface CreateTeacherDto {
  name: string;
  nickname?: string;
  email?: string;
  /** @minLength 6 */
  password?: string;
  dob?: string;
  contactNumber?: string;
  remarks?: string;
  /** @nullable */
  photoFileId?: string | null;
  isActive?: boolean;
  classIds?: string[];
}
