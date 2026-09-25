// @ts-nocheck
import type { TeacherClassDto } from './teacherClassDto';

export interface TeachingHistoryYearDto {
  academicYearId: string;
  academicYearName: string;
  classes: TeacherClassDto[];
}
