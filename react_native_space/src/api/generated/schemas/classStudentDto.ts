// @ts-nocheck

export interface ClassStudentDto {
  id: string;
  name: string;
  /** @nullable */
  photoFileId: string | null;
  /** @nullable */
  photoUrl: string | null;
  enrollmentStatus: string;
}
