// @ts-nocheck
import type { ClassAttendanceByDateDto } from './classAttendanceByDateDto';

export interface AttendanceByDateResponseDto {
  date: string;
  classes: ClassAttendanceByDateDto[];
}