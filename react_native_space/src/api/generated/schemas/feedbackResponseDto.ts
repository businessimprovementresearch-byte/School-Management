// @ts-nocheck

export interface FeedbackResponseDto {
  id: string;
  classSessionId: string;
  teacherId: string;
  teacherName: string;
  /** @nullable */
  studentId: string | null;
  /** @nullable */
  studentName: string | null;
  content: string;
  type: string;
  createdAt: string;
}
