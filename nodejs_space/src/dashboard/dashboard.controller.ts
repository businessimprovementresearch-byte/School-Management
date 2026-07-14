import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DashboardResponseDto } from './dto/dashboard-response.dto';
import type { Request } from 'express';

@ApiTags('Dashboard')
@Controller('api/dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get()
  async getDashboard(@Req() req: Request): Promise<DashboardResponseDto> {
    const user = req.user as { userId: string; role: string };
    return this.dashboardService.getDashboard(user.userId, user.role);
  }
}
