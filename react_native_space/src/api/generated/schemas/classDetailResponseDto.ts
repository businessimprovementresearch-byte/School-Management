// @ts-nocheck
import type { ClassMetricInfoDto } from './classMetricInfoDto';
import type { ClassSessionInfoDto } from './classSessionInfoDto';
import type { ClassStudentDto } from './classStudentDto';
import type { ClassTeacherDto } from './classTeacherDto';

export interface ClassDetailResponseDto {
  id: string;
  name: string;
  grade: string;
  /** @nullable */
  description: string | null;
  teachers: ClassTeacherDto[];
  students: ClassStudentDto[];
  sessions: ClassSessionInfoDto[];
  metrics: ClassMetricInfoDto[];
}
