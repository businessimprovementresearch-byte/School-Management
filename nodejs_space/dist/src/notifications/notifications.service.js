"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NotificationsService = class NotificationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async teacherIdForUser(userId) {
        const t = await this.prisma.teacher.findUnique({ where: { userId } });
        return t?.id ?? null;
    }
    async list(userId, role) {
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
    async unreadCount(userId, role) {
        let where = { read: false };
        if (role !== 'ADMIN') {
            const teacherId = await this.teacherIdForUser(userId);
            where = { read: false, teacherId: teacherId ?? '__none__' };
        }
        const count = await this.prisma.notification.count({ where });
        return { count };
    }
    async markRead(id) {
        await this.prisma.notification.update({ where: { id }, data: { read: true } });
        return { success: true };
    }
    async markAllRead(userId, role) {
        let where = { read: false };
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
    async updateAlertSetting(teacherId, dto) {
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
            if (session._count.studentAttendance > 0)
                continue;
            for (const assignment of session.class.assignments) {
                const teacher = assignment.teacher;
                const setting = teacher.alertSetting;
                const enabled = setting?.enabled ?? true;
                const delayMinutes = setting?.delayMinutes ?? 60;
                if (!enabled)
                    continue;
                const dueTime = new Date(session.date.getTime() + delayMinutes * 60 * 1000);
                if (now < dueTime)
                    continue;
                const existing = await this.prisma.notification.findFirst({
                    where: { teacherId: teacher.id, sessionId: session.id, type: 'ATTENDANCE_ALERT' },
                });
                if (existing)
                    continue;
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
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map