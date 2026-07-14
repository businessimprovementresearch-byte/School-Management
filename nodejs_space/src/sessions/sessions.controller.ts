import { Controller, Post, Get, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SessionsService } from './sessions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionDetailResponseDto } from './dto/session-detail-response.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';

@ApiTags('Sessions')
@Controller('api/sessions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Post()
  async create(@Body() dto: CreateSessionDto): Promise<SessionDetailResponseDto> {
    return this.sessionsService.create(dto.classId, dto.date, dto.academicYearId, dto.termId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SessionDetailResponseDto> {
    return this.sessionsService.findOne(id);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async remove(@Param('id') id: string): Promise<SuccessResponseDto> {
    return this.sessionsService.remove(id);
  }
}
