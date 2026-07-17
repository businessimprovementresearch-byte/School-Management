import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { CheckAlertsResultDto } from './dto/notification.dto';

@ApiTags('Alerts')
@Controller('api/alerts')
export class AlertsController {
  constructor(private service: NotificationsService) {}

  // Public endpoint intended to be called by an external scheduler (cron).
  @Post('check')
  async check(): Promise<CheckAlertsResultDto> {
    return this.service.checkAlerts();
  }
}
