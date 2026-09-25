import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { BulkCreateSessionsDto } from './dto/bulk-create-sessions.dto';
import { SetSessionHolidayDto } from './dto/set-session-holiday.dto';
import { SessionDetailResponseDto } from './dto/session-detail-response.dto';
import { BulkCreateSessionsResponseDto } from './dto/bulk-create-sessions-response.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';
export declare class SessionsController {
    private sessionsService;
    constructor(sessionsService: SessionsService);
    create(dto: CreateSessionDto): Promise<SessionDetailResponseDto>;
    bulkCreate(dto: BulkCreateSessionsDto): Promise<BulkCreateSessionsResponseDto>;
    findOne(id: string): Promise<SessionDetailResponseDto>;
    remove(id: string): Promise<SuccessResponseDto>;
    setHoliday(id: string, dto: SetSessionHolidayDto): Promise<SessionDetailResponseDto>;
}
