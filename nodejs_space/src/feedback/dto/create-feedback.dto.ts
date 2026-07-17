import { IsUUID, IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateFeedbackDto {
  @IsUUID()
  classSessionId: string;

  @IsString()
  content: string;

  @IsEnum(['STUDENT_SPECIFIC', 'GENERAL'])
  type: string;

  @IsUUID()
  @IsOptional()
  studentId?: string | null;
}
