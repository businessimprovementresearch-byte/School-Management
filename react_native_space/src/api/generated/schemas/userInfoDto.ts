// @ts-nocheck

export interface UserInfoDto {
  id: string;
  email: string;
  name: string;
  role: string;
  /** @nullable */
  teacherId: string | null;
}
