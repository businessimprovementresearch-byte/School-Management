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
exports.AcademicYearsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AcademicYearsService = class AcademicYearsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const years = await this.prisma.academicYear.findMany({ orderBy: { startDate: 'desc' } });
        return years.map((y) => ({
            id: y.id,
            name: y.name,
            startDate: y.startDate.toISOString(),
            endDate: y.endDate.toISOString(),
            isActive: y.isActive,
            createdAt: y.createdAt.toISOString(),
        }));
    }
    async create(data) {
        const year = await this.prisma.academicYear.create({
            data: {
                name: data.name,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
            },
        });
        return {
            id: year.id,
            name: year.name,
            startDate: year.startDate.toISOString(),
            endDate: year.endDate.toISOString(),
            isActive: year.isActive,
        };
    }
    async update(id, data) {
        if (data.isActive === true) {
            await this.prisma.academicYear.updateMany({ data: { isActive: false } });
        }
        const year = await this.prisma.academicYear.update({
            where: { id },
            data: {
                ...(data.name !== undefined ? { name: data.name } : {}),
                ...(data.startDate !== undefined ? { startDate: new Date(data.startDate) } : {}),
                ...(data.endDate !== undefined ? { endDate: new Date(data.endDate) } : {}),
                ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
            },
        });
        return {
            id: year.id,
            name: year.name,
            startDate: year.startDate.toISOString(),
            endDate: year.endDate.toISOString(),
            isActive: year.isActive,
        };
    }
};
exports.AcademicYearsService = AcademicYearsService;
exports.AcademicYearsService = AcademicYearsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AcademicYearsService);
//# sourceMappingURL=academic-years.service.js.map