import { Controller, Get, Post, Patch, Put, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { NotificationDto, UnreadCountDto, AlertSettingDto, UpdateAlertSettingDto } from './dto/notification.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';
import type { Request } from 'express';

@ApiTags('Notifications')
@Controller('api/notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationsController {
  constructor(private service: NotificationsService) {}

  @Get()
  async list(@Req() req: Request): Promise<NotificationDto[]> {
    const u = req.user as { userId: string; role: string };
    return this.service.list(u.userId, u.role);
  }

  @Get('unread-count')
  async unreadCount(@Req() req: Request): Promise<UnreadCountDto> {
    const u = req.user as { userId: string; role: string };
    return this.service.unreadCount(u.userId, u.role);
  }

  @Patch(':id/read')
  async markRead(@Param('id') id: string): Promise<SuccessResponseDto> {
    return this.service.markRead(id);
  }

  @Post('read-all')
  async markAllRead(@Req() req: Request): Promise<SuccessResponseDto> {
    const u = req.user as { userId: string; role: string };
    return this.service.markAllRead(u.userId, u.role);
  }

  @Get('alert-settings')
  @Roles('ADMIN')
  async listAlertSettings(): Promise<AlertSettingDto[]> {
    return this.service.listAlertSettings();
  }

  @Put('alert-settings/:teacherId')
  @Roles('ADMIN')
  async updateAlertSetting(@Param('teacherId') teacherId: string, @Body() dto: UpdateAlertSettingDto): Promise<AlertSettingDto> {
    return this.service.updateAlertSetting(teacherId, dto);
  }
}
