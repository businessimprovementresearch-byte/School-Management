import { TermsService } from './terms.service';
import { CreateTermDto } from './dto/create-term.dto';
import { TermResponseDto, TermListItemDto } from './dto/term-response.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';
export declare class TermsController {
    private service;
    constructor(service: TermsService);
    findAll(academicYearId?: string): Promise<TermListItemDto[]>;
    create(dto: CreateTermDto): Promise<TermResponseDto>;
    remove(id: string): Promise<SuccessResponseDto>;
}
