// @ts-nocheck

export interface EventParticipantDto {
  id: string;
  /** @nullable */
  studentId: string | null;
  /** @nullable */
  teacherId: string | null;
  /** @nullable */
  groupId: string | null;
  name: string;
  kind: string;
  /** @nullable */
  photoUrl: string | null;
}
