// @ts-nocheck

export interface CreateSessionDto {
  classId: string;
  date: string;
  academicYearId: string;
  /** @nullable */
  termId?: string | null;
}
