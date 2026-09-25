// @ts-nocheck

export interface StudentBreakdownDto {
  studentId: string;
  studentName: string;
  present: number;
  absent: number;
  late: number;
  excused: number;
  total: number;
  percentage: number;
}
