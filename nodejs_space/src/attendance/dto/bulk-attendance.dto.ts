import { IsUUID, IsArray, ValidateNested, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class StudentAttendanceEntry {
  @IsUUID()
  studentId: string;

  @IsString()
  status: string;
}

export class TeacherAttendanceEntry {
  @IsUUID()
  teacherId: string;

  @IsString()
  status: string;
}

export class BulkAttendanceDto {
  @IsUUID()
  sessionId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudentAttendanceEntry)
  studentAttendance: StudentAttendanceEntry[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeacherAttendanceEntry)
  @IsOptional()
  teacherAttendance?: TeacherAttendanceEntry[];
}
