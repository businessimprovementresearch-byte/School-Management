import { ReportCardsService } from './report-cards.service';
import { GenerateReportCardDto } from './dto/generate-report-card.dto';
import { ReportCardResponseDto } from './dto/report-card-response.dto';
import { FileUrlResponseDto } from '../upload/dto/file-url-response.dto';
import type { Request } from 'express';
export declare class ReportCardsController {
    private service;
    constructor(service: ReportCardsService);
    generate(req: Request, dto: GenerateReportCardDto): Promise<ReportCardResponseDto>;
    findAll(studentId: string): Promise<ReportCardResponseDto[]>;
    getDownload(id: string): Promise<FileUrlResponseDto>;
}
