// @ts-nocheck

export interface CreateFeedbackDto {
  classSessionId: string;
  content: string;
  type: string;
  /** @nullable */
  studentId?: string | null;
}
