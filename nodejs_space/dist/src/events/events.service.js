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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const upload_service_1 = require("../upload/upload.service");
let EventsService = class EventsService {
    prisma;
    uploadService;
    constructor(prisma, uploadService) {
        this.prisma = prisma;
        this.uploadService = uploadService;
    }
    async findAll() {
        const events = await this.prisma.event.findMany({
            orderBy: { date: 'desc' },
            include: { _count: { select: { participants: true, groups: true } } },
        });
        return events.map((e) => ({
            id: e.id,
            name: e.name,
            description: e.description,
            date: e.date.toISOString(),
            location: e.location,
            participantCount: e._count.participants,
            groupCount: e._count.groups,
        }));
    }
    async create(dto) {
        const e = await this.prisma.event.create({
            data: {
                name: dto.name,
                description: dto.description ?? null,
                date: new Date(dto.date),
                location: dto.location ?? null,
            },
            include: { _count: { select: { participants: true, groups: true } } },
        });
        return {
            id: e.id,
            name: e.name,
            description: e.description,
            date: e.date.toISOString(),
            location: e.location,
            participantCount: e._count.participants,
            groupCount: e._count.groups,
        };
    }
    async update(id, dto) {
        const e = await this.prisma.event.update({
            where: { id },
            data: {
                ...(dto.name !== undefined ? { name: dto.name } : {}),
                ...(dto.description !== undefined ? { description: dto.description } : {}),
                ...(dto.date !== undefined ? { date: new Date(dto.date) } : {}),
                ...(dto.location !== undefined ? { location: dto.location } : {}),
            },
            include: { _count: { select: { participants: true, groups: true } } },
        });
        return {
            id: e.id,
            name: e.name,
            description: e.description,
            date: e.date.toISOString(),
            location: e.location,
            participantCount: e._count.participants,
            groupCount: e._count.groups,
        };
    }
    async remove(id) {
        await this.prisma.event.delete({ where: { id } });
        return { success: true };
    }
    async findOne(id) {
        const e = await this.prisma.event.findUnique({
            where: { id },
            include: {
                groups: { orderBy: { createdAt: 'asc' } },
                participants: {
                    include: { student: true, teacher: true },
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
        if (!e)
            throw new common_1.NotFoundException('Event not found');
        const participants = await Promise.all(e.participants.map(async (p) => {
            const isStudent = !!p.studentId;
            const photoFileId = isStudent ? p.student?.photoFileId ?? null : p.teacher?.photoFileId ?? null;
            return {
                id: p.id,
                studentId: p.studentId,
                teacherId: p.teacherId,
                groupId: p.groupId,
                name: isStudent ? p.student?.name ?? 'Unknown' : p.teacher?.name ?? 'Unknown',
                kind: isStudent ? 'STUDENT' : 'TEACHER',
                photoUrl: await this.uploadService.getFileUrlByFileId(photoFileId),
            };
        }));
        return {
            id: e.id,
            name: e.name,
            description: e.description,
            date: e.date.toISOString(),
            location: e.location,
            groups: e.groups.map((g) => ({ id: g.id, name: g.name })),
            participants,
        };
    }
    async createGroup(eventId, name) {
        const g = await this.prisma.eventGroup.create({ data: { eventId, name } });
        return { id: g.id, name: g.name };
    }
    async removeGroup(groupId) {
        await this.prisma.eventGroup.delete({ where: { id: groupId } });
        return { success: true };
    }
    async addParticipant(eventId, dto) {
        await this.prisma.eventParticipant.create({
            data: {
                eventId,
                studentId: dto.studentId ?? null,
                teacherId: dto.teacherId ?? null,
                groupId: dto.groupId ?? null,
            },
        });
        return { success: true };
    }
    async removeParticipant(participantId) {
        await this.prisma.eventParticipant.delete({ where: { id: participantId } });
        return { success: true };
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], EventsService);
//# sourceMappingURL=events.service.js.map