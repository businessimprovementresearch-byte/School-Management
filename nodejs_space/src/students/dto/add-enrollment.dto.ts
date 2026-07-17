import { IsUUID } from 'class-validator';

export class AddEnrollmentDto {
  @IsUUID()
  classId: string;
}
