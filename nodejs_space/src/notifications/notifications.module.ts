import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { AlertsController } from './alerts.controller';
import { NotificationsService } from './notifications.service';

@Module({
  controllers: [NotificationsController, AlertsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
