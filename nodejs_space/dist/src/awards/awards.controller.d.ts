import { AwardsService } from './awards.service';
import { CreateAwardDto, IssueAwardDto, AwardListItemDto, AwardIssuanceDto } from './dto/award.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';
export declare class AwardsController {
    private service;
    constructor(service: AwardsService);
    findAll(): Promise<AwardListItemDto[]>;
    findIssuances(studentId?: string, teacherId?: string): Promise<AwardIssuanceDto[]>;
    create(dto: CreateAwardDto): Promise<AwardListItemDto>;
    remove(id: string): Promise<SuccessResponseDto>;
    issue(dto: IssueAwardDto): Promise<SuccessResponseDto>;
    removeIssuance(id: string): Promise<SuccessResponseDto>;
}
