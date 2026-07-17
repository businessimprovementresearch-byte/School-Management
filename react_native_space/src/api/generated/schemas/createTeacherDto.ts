// @ts-nocheck

export interface CreateTeacherDto {
  email: string;
  /** @minLength 6 */
  password: string;
  name: string;
  dob: string;
  contactNumber: string;
  /** @nullable */
  photoFileId?: string | null;
  classIds?: string[];
}
