import { NotificationsService } from './notifications.service';
import { NotificationDto, UnreadCountDto, AlertSettingDto, UpdateAlertSettingDto } from './dto/notification.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';
import type { Request } from 'express';
export declare class NotificationsController {
    private service;
    constructor(service: NotificationsService);
    list(req: Request): Promise<NotificationDto[]>;
    unreadCount(req: Request): Promise<UnreadCountDto>;
    markRead(id: string): Promise<SuccessResponseDto>;
    markAllRead(req: Request): Promise<SuccessResponseDto>;
    listAlertSettings(): Promise<AlertSettingDto[]>;
    updateAlertSetting(teacherId: string, dto: UpdateAlertSettingDto): Promise<AlertSettingDto>;
}
