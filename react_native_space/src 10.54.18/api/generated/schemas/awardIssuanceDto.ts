// @ts-nocheck

export interface AwardIssuanceDto {
  id: string;
  awardId: string;
  awardName: string;
  /** @nullable */
  awardIcon: string | null;
  /** @nullable */
  note: string | null;
  issuedAt: string;
  recipientName: string;
  recipientKind: string;
  /** @nullable */
  studentId: string | null;
  /** @nullable */
  teacherId: string | null;
  /** @nullable */
  photoUrl: string | null;
}
