import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProgressService } from './progress.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProgressDto } from './dto/create-progress.dto';
import { ProgressResponseDto } from './dto/progress-response.dto';
import { ProgressListResponseDto } from './dto/progress-list-response.dto';

@ApiTags('Progress')
@Controller('api/progress')
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Post()
  async create(@Body() dto: CreateProgressDto): Promise<ProgressResponseDto> {
    return this.progressService.create(dto);
  }

  @Get()
  async findByStudent(@Query('studentId') studentId: string): Promise<ProgressListResponseDto> {
    return this.progressService.findByStudent(studentId);
  }
}
