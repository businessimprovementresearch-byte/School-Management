import { Controller, Post, Get, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReportCardsService } from './report-cards.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GenerateReportCardDto } from './dto/generate-report-card.dto';
import { ReportCardResponseDto } from './dto/report-card-response.dto';
import { FileUrlResponseDto } from '../upload/dto/file-url-response.dto';
import type { Request } from 'express';

@ApiTags('Report Cards')
@Controller('api/report-cards')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportCardsController {
  constructor(private service: ReportCardsService) {}

  @Post('generate')
  @Roles('ADMIN')
  async generate(@Req() req: Request, @Body() dto: GenerateReportCardDto): Promise<ReportCardResponseDto> {
    const user = req.user as { userId: string };
    return this.service.generate(user.userId, dto.studentId, dto.academicYearId, dto.termId);
  }

  @Get()
  async findAll(@Query('studentId') studentId: string): Promise<ReportCardResponseDto[]> {
    return this.service.findAll(studentId);
  }

  @Get(':id/download')
  async getDownload(@Param('id') id: string): Promise<FileUrlResponseDto> {
    return this.service.getDownloadUrl(id);
  }
}
