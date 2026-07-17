import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateAlertSettingDto } from './dto/notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  private async teacherIdForUser(userId: string): Promise<string | null> {
    const t = await this.prisma.teacher.findUnique({ where: { userId } });
    return t?.id ?? null;
  }

  async list(userId: string, role: string) {
    let where = {};
    if (role !== 'ADMIN') {
      const teacherId = await this.teacherIdForUser(userId);
      where = { teacherId: teacherId ?? '__none__' };
    }
    const items = await this.prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    return items.map((n) => ({
      id: n.id,
      teacherId: n.teacherId,
      title: n.title,
      body: n.body,
      type: n.type,
      read: n.read,
      createdAt: n.createdAt.toISOString(),
    }));
  }

  async unreadCount(userId: string, role: string) {
    let where: any = { read: false };
    if (role !== 'ADMIN') {
      const teacherId = await this.teacherIdForUser(userId);
      where = { read: false, teacherId: teacherId ?? '__none__' };
    }
    const count = await this.prisma.notification.count({ where });
    return { count };
  }

  async markRead(id: string) {
    await this.prisma.notification.update({ where: { id }, data: { read: true } });
    return { success: true };
  }

  async markAllRead(userId: string, role: string) {
    let where: any = { read: false };
    if (role !== 'ADMIN') {
      const teacherId = await this.teacherIdForUser(userId);
      where = { read: false, teacherId: teacherId ?? '__none__' };
    }
    await this.prisma.notification.updateMany({ where, data: { read: true } });
    return { success: true };
  }

  async listAlertSettings() {
    const teachers = await this.prisma.teacher.findMany({
      orderBy: { name: 'asc' },
      include: { alertSetting: true },
    });
    return teachers.map((t) => ({
      teacherId: t.id,
      teacherName: t.name,
      delayMinutes: t.alertSetting?.delayMinutes ?? 60,
      enabled: t.alertSetting?.enabled ?? true,
      channel: t.alertSetting?.channel ?? 'IN_APP',
    }));
  }

  async updateAlertSetting(teacherId: string, dto: UpdateAlertSettingDto) {
    const existing = await this.prisma.teacherAlertSetting.findUnique({ where: { teacherId } });
    const s = await this.prisma.teacherAlertSetting.upsert({
      where: { teacherId },
      create: {
        teacherId,
        delayMinutes: dto.delayMinutes ?? 60,
        enabled: dto.enabled ?? true,
        channel: dto.channel ?? 'IN_APP',
      },
      update: {
        ...(dto.delayMinutes !== undefined ? { delayMinutes: dto.delayMinutes } : {}),
        ...(dto.enabled !== undefined ? { enabled: dto.enabled } : {}),
        ...(dto.channel !== undefined ? { channel: dto.channel } : {}),
      },
    });
    const teacher = await this.prisma.teacher.findUnique({ where: { id: teacherId } });
    return {
      teacherId,
      teacherName: teacher?.name ?? '',
      delayMinutes: s.delayMinutes,
      enabled: s.enabled,
      channel: s.channel,
    };
  }

  async checkAlerts() {
    const now = new Date();
    // Look at sessions in the last 7 days
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const sessions = await this.prisma.classSession.findMany({
      where: { date: { gte: weekAgo, lte: now } },
      include: {
        class: { include: { assignments: { include: { teacher: { include: { alertSetting: true } } } } } },
        _count: { select: { studentAttendance: true } },
      },
    });
    let created = 0;
    for (const session of sessions) {
      if (session._count.studentAttendance > 0) continue;
      for (const assignment of session.class.assignments) {
        const teacher = assignment.teacher;
        const setting = teacher.alertSetting;
        const enabled = setting?.enabled ?? true;
        const delayMinutes = setting?.delayMinutes ?? 60;
        if (!enabled) continue;
        const dueTime = new Date(session.date.getTime() + delayMinutes * 60 * 1000);
        if (now < dueTime) continue;
        const existing = await this.prisma.notification.findFirst({
          where: { teacherId: teacher.id, sessionId: session.id, type: 'ATTENDANCE_ALERT' },
        });
        if (existing) continue;
        await this.prisma.notification.create({
          data: {
            teacherId: teacher.id,
            title: 'Attendance not submitted',
            body: `Please submit attendance for ${session.class.name} on ${session.date.toISOString().split('T')[0]}.`,
            type: 'ATTENDANCE_ALERT',
            sessionId: session.id,
          },
        });
        created++;
      }
    }
    return { created, checkedSessions: sessions.length };
  }
}
