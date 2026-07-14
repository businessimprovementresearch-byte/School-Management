import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackResponseDto } from './dto/feedback-response.dto';
import type { Request } from 'express';
export declare class FeedbackController {
    private feedbackService;
    constructor(feedbackService: FeedbackService);
    create(req: Request, dto: CreateFeedbackDto): Promise<FeedbackResponseDto>;
}
