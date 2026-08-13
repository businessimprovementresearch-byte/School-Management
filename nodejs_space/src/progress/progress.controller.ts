import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProgressService } from './progress.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProgressResponseDto } from './dto/progress-response.dto';
import { ProgressListResponseDto } from './dto/progress-list-response.dto';
import { CreateProgressDto } from './dto/create-progress.dto';
import { BulkProgressDto } from './dto/bulk-progress.dto';

@ApiTags('Progress')
@Controller('api/progress')
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Post()
  async create(@Body() dto: CreateProgressDto): Promise<ProgressResponseDto> {
    return this.progressService.create(dto);
  }

  @Post('bulk')
  async bulkSave(@Body() dto: BulkProgressDto) {
    return this.progressService.bulkSave(dto.classSessionId, dto.progressMetricId, dto.entries);
  }

  @Get('session')
  async findBySession(
    @Query('classSessionId') classSessionId: string,
    @Query('progressMetricId') progressMetricId: string,
  ) {
    return this.progressService.findBySession(classSessionId, progressMetricId);
  }

  @Get()
  async findByStudent(@Query('studentId') studentId: string): Promise<ProgressListResponseDto> {
    return this.progressService.findByStudent(studentId);
  }
}
