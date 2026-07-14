import { NotificationsService } from './notifications.service';
import { CheckAlertsResultDto } from './dto/notification.dto';
export declare class AlertsController {
    private service;
    constructor(service: NotificationsService);
    check(): Promise<CheckAlertsResultDto>;
}
