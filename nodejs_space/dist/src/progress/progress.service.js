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
exports.ProgressService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProgressService = class ProgressService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const entry = await this.prisma.studentProgress.create({
            data: {
                studentId: data.studentId,
                progressMetricId: data.progressMetricId,
                classSessionId: data.classSessionId,
                value: data.value,
                notes: data.notes ?? null,
            },
        });
        return {
            id: entry.id,
            studentId: entry.studentId,
            progressMetricId: entry.progressMetricId,
            classSessionId: entry.classSessionId,
            value: entry.value,
            notes: entry.notes,
            createdAt: entry.createdAt.toISOString(),
        };
    }
    async bulkSave(classSessionId, progressMetricId, entries) {
        let savedCount = 0;
        for (const e of entries) {
            const existing = await this.prisma.studentProgress.findFirst({
                where: { studentId: e.studentId, progressMetricId, classSessionId },
            });
            if (existing) {
                await this.prisma.studentProgress.update({
                    where: { id: existing.id },
                    data: { value: e.value, notes: e.notes ?? null },
                });
            }
            else {
                await this.prisma.studentProgress.create({
                    data: {
                        studentId: e.studentId,
                        progressMetricId,
                        classSessionId,
                        value: e.value,
                        notes: e.notes ?? null,
                    },
                });
            }
            savedCount++;
        }
        return { savedCount };
    }
    async findBySession(classSessionId, progressMetricId) {
        const entries = await this.prisma.studentProgress.findMany({
            where: { classSessionId, progressMetricId },
        });
        return entries.map((e) => ({
            studentId: e.studentId,
            value: e.value,
            notes: e.notes,
        }));
    }
    async findByStudent(studentId, classId) {
        const entries = await this.prisma.studentProgress.findMany({
            where: {
                studentId,
                ...(classId ? { progressMetric: { classId } } : {}),
            },
            include: {
                progressMetric: { include: { class: true } },
                classSession: { include: { academicYear: true } },
            },
            orderBy: { classSession: { date: 'asc' } },
        });
        const metricMap = new Map();
        for (const p of entries) {
            const mid = p.progressMetricId;
            if (!metricMap.has(mid)) {
                metricMap.set(mid, {
                    metricId: mid,
                    metricName: p.progressMetric.name,
                    metricType: p.progressMetric.type,
                    classId: p.progressMetric.classId,
                    className: p.progressMetric.class.name,
                    entries: [],
                });
            }
            metricMap.get(mid).entries.push({
                id: p.id,
                date: p.classSession.date.toISOString(),
                sessionId: p.classSessionId,
                value: p.value,
                notes: p.notes,
            });
        }
        const metrics = Array.from(metricMap.values());
        return {
            metrics,
        };
    }
};
exports.ProgressService = ProgressService;
exports.ProgressService = ProgressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProgressService);
//# sourceMappingURL=progress.service.js.map