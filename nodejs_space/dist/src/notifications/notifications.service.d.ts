import { PrismaService } from '../prisma/prisma.service';
import { UpdateAlertSettingDto } from './dto/notification.dto';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    private teacherIdForUser;
    list(userId: string, role: string): Promise<{
        id: string;
        teacherId: string | null;
        title: string;
        body: string;
        type: string;
        read: boolean;
        createdAt: string;
    }[]>;
    unreadCount(userId: string, role: string): Promise<{
        count: number;
    }>;
    markRead(id: string): Promise<{
        success: boolean;
    }>;
    markAllRead(userId: string, role: string): Promise<{
        success: boolean;
    }>;
    listAlertSettings(): Promise<{
        teacherId: string;
        teacherName: string;
        delayMinutes: number;
        enabled: boolean;
        channel: string;
    }[]>;
    updateAlertSetting(teacherId: string, dto: UpdateAlertSettingDto): Promise<{
        teacherId: string;
        teacherName: string;
        delayMinutes: number;
        enabled: boolean;
        channel: string;
    }>;
    checkAlerts(): Promise<{
        created: number;
        checkedSessions: number;
    }>;
}
