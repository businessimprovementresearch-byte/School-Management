// @ts-nocheck

export interface ClassSessionInfoDto {
  id: string;
  date: string;
  attendanceSubmitted: boolean;
  isHoliday: boolean;
  /** @nullable */
  termName: string | null;
}
