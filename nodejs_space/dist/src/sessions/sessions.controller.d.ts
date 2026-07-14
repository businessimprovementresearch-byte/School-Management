import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionDetailResponseDto } from './dto/session-detail-response.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';
export declare class SessionsController {
    private sessionsService;
    constructor(sessionsService: SessionsService);
    create(dto: CreateSessionDto): Promise<SessionDetailResponseDto>;
    findOne(id: string): Promise<SessionDetailResponseDto>;
    remove(id: string): Promise<SuccessResponseDto>;
}
