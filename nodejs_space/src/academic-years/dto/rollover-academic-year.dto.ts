import { IsUUID, IsOptional, IsArray } from 'class-validator';

export class RolloverAcademicYearDto {
    @IsUUID()
    @IsOptional()
    fromAcademicYearId?: string;

    @IsArray()
    @IsOptional()
    excludeStudentIds?: string[];

    @IsArray()
    @IsOptional()
    excludeTeacherIds?: string[];
}