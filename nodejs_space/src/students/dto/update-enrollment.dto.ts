import { IsEnum } from 'class-validator';

export class UpdateEnrollmentDto {
  @IsEnum(['ACTIVE', 'COMPLETED', 'WITHDRAWN'])
  status: string;
}
