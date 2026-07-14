import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackResponseDto } from './dto/feedback-response.dto';
import type { Request } from 'express';

@ApiTags('Feedback')
@Controller('api/feedback')
@UseGuards(JwtAuthGuard)
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post()
  async create(@Req() req: Request, @Body() dto: CreateFeedbackDto): Promise<FeedbackResponseDto> {
    const user = req.user as { userId: string };
    return this.feedbackService.create(user.userId, dto);
  }
}
