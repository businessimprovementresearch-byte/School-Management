import { IsString, IsUUID, IsEnum, IsOptional } from 'class-validator';

export class CreateMetricDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsUUID()
  classId: string;

  @IsEnum(['SCORE', 'LEVEL', 'RATING'])
  type: string;
}
