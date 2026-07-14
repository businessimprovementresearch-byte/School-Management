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
    async findByStudentAndClass(studentId, classId) {
        const where = { studentId };
        if (classId) {
            where.progressMetric = { classId };
        }
        const entries = await this.prisma.studentProgress.findMany({
            where,
            include: {
                progressMetric: true,
                classSession: true,
            },
            orderBy: { classSession: { date: 'asc' } },
        });
        const metricMap = new Map();
        for (const e of entries) {
            const mid = e.progressMetricId;
            if (!metricMap.has(mid)) {
                metricMap.set(mid, {
                    metricId: mid,
                    metricName: e.progressMetric.name,
                    metricType: e.progressMetric.type,
                    entries: [],
                });
            }
            metricMap.get(mid).entries.push({
                id: e.id,
                date: e.classSession.date.toISOString(),
                sessionId: e.classSessionId,
                value: e.value,
                notes: e.notes,
            });
        }
        return { metrics: Array.from(metricMap.values()) };
    }
};
exports.ProgressService = ProgressService;
exports.ProgressService = ProgressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProgressService);
//# sourceMappingURL=progress.service.js.map