import { AcademicYearsService } from './academic-years.service';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';
import { AcademicYearResponseDto, AcademicYearListItemDto } from './dto/academic-year-response.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';
import { RolloverAcademicYearDto } from './dto/rollover-academic-year.dto';
export declare class AcademicYearsController {
    private service;
    constructor(service: AcademicYearsService);
    findAll(): Promise<AcademicYearListItemDto[]>;
    create(dto: CreateAcademicYearDto): Promise<AcademicYearResponseDto>;
    update(id: string, dto: UpdateAcademicYearDto): Promise<AcademicYearResponseDto>;
    remove(id: string, force?: string): Promise<SuccessResponseDto>;
    rollover(id: string, dto: RolloverAcademicYearDto): Promise<{
        fromAcademicYearId: string;
        toAcademicYearId: string;
        studentsEnrolled: number;
        studentsArchived: number;
        teachersAssigned: number;
        teachersArchived: number;
    }>;
}
