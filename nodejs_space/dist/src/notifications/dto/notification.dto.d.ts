export declare class NotificationDto {
    id: string;
    teacherId: string | null;
    title: string;
    body: string;
    type: string;
    read: boolean;
    createdAt: string;
}
export declare class UnreadCountDto {
    count: number;
}
export declare class AlertSettingDto {
    teacherId: string;
    teacherName: string;
    delayMinutes: number;
    enabled: boolean;
    channel: string;
}
export declare class UpdateAlertSettingDto {
    delayMinutes?: number;
    enabled?: boolean;
    channel?: string;
}
export declare class CheckAlertsResultDto {
    created: number;
    checkedSessions: number;
}
