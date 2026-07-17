// @ts-nocheck

export interface SessionStudentDto {
  id: string;
  name: string;
  /** @nullable */
  photoFileId: string | null;
  /** @nullable */
  photoUrl: string | null;
  /** @nullable */
  attendanceStatus: string | null;
}
