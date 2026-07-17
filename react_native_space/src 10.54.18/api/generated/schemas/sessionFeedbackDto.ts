// @ts-nocheck

export interface SessionFeedbackDto {
  id: string;
  teacherName: string;
  content: string;
  type: string;
  /** @nullable */
  studentId: string | null;
  /** @nullable */
  studentName: string | null;
  createdAt: string;
}
