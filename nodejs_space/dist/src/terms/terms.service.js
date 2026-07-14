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
exports.TermsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TermsService = class TermsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(academicYearId) {
        const where = academicYearId ? { academicYearId } : {};
        const terms = await this.prisma.term.findMany({
            where,
            include: { academicYear: true },
            orderBy: { startDate: 'asc' },
        });
        return terms.map((t) => ({
            id: t.id,
            name: t.name,
            startDate: t.startDate.toISOString(),
            endDate: t.endDate.toISOString(),
            academicYearId: t.academicYearId,
            academicYearName: t.academicYear.name,
        }));
    }
    async create(data) {
        const term = await this.prisma.term.create({
            data: {
                name: data.name,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                academicYearId: data.academicYearId,
            },
        });
        return {
            id: term.id,
            name: term.name,
            startDate: term.startDate.toISOString(),
            endDate: term.endDate.toISOString(),
            academicYearId: term.academicYearId,
        };
    }
    async remove(id) {
        const term = await this.prisma.term.findUnique({ where: { id } });
        if (!term)
            throw new common_1.NotFoundException('Term not found');
        await this.prisma.term.delete({ where: { id } });
        return { success: true };
    }
};
exports.TermsService = TermsService;
exports.TermsService = TermsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TermsService);
//# sourceMappingURL=terms.service.js.map