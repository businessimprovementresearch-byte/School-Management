import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MetricsService } from './metrics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricResponseDto, MetricListItemDto } from './dto/metric-response.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';

@ApiTags('Metrics')
@Controller('api/metrics')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MetricsController {
  constructor(private service: MetricsService) {}

  @Get()
  async findAll(@Query('classId') classId?: string): Promise<MetricListItemDto[]> {
    return this.service.findAll(classId);
  }

  @Post()
  @Roles('ADMIN')
  async create(@Body() dto: CreateMetricDto): Promise<MetricResponseDto> {
    return this.service.create(dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async remove(@Param('id') id: string): Promise<SuccessResponseDto> {
    return this.service.remove(id);
  }
}
