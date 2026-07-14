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
exports.AwardsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const upload_service_1 = require("../upload/upload.service");
let AwardsService = class AwardsService {
    prisma;
    uploadService;
    constructor(prisma, uploadService) {
        this.prisma = prisma;
        this.uploadService = uploadService;
    }
    async findAll() {
        const awards = await this.prisma.award.findMany({
            orderBy: { createdAt: 'desc' },
            include: { _count: { select: { issuances: true } } },
        });
        return awards.map((a) => ({
            id: a.id,
            name: a.name,
            description: a.description,
            icon: a.icon,
            issuedCount: a._count.issuances,
        }));
    }
    async create(dto) {
        const a = await this.prisma.award.create({
            data: { name: dto.name, description: dto.description ?? null, icon: dto.icon ?? null },
            include: { _count: { select: { issuances: true } } },
        });
        return { id: a.id, name: a.name, description: a.description, icon: a.icon, issuedCount: a._count.issuances };
    }
    async remove(id) {
        await this.prisma.award.delete({ where: { id } });
        return { success: true };
    }
    async issue(dto) {
        await this.prisma.awardIssuance.create({
            data: {
                awardId: dto.awardId,
                studentId: dto.studentId ?? null,
                teacherId: dto.teacherId ?? null,
                note: dto.note ?? null,
            },
        });
        return { success: true };
    }
    async removeIssuance(id) {
        await this.prisma.awardIssuance.delete({ where: { id } });
        return { success: true };
    }
    async findIssuances(studentId, teacherId) {
        const issuances = await this.prisma.awardIssuance.findMany({
            where: {
                ...(studentId ? { studentId } : {}),
                ...(teacherId ? { teacherId } : {}),
            },
            include: { award: true, student: true, teacher: true },
            orderBy: { issuedAt: 'desc' },
        });
        return Promise.all(issuances.map(async (i) => {
            const isStudent = !!i.studentId;
            const photoFileId = isStudent ? i.student?.photoFileId ?? null : i.teacher?.photoFileId ?? null;
            return {
                id: i.id,
                awardId: i.awardId,
                awardName: i.award.name,
                awardIcon: i.award.icon,
                note: i.note,
                issuedAt: i.issuedAt.toISOString(),
                recipientName: isStudent ? i.student?.name ?? 'Unknown' : i.teacher?.name ?? 'Unknown',
                recipientKind: isStudent ? 'STUDENT' : 'TEACHER',
                studentId: i.studentId,
                teacherId: i.teacherId,
                photoUrl: await this.uploadService.getFileUrlByFileId(photoFileId),
            };
        }));
    }
};
exports.AwardsService = AwardsService;
exports.AwardsService = AwardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], AwardsService);
//# sourceMappingURL=awards.service.js.map