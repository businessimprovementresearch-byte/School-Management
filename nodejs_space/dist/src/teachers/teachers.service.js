"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeachersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const upload_service_1 = require("../upload/upload.service");
const bcrypt = __importStar(require("bcryptjs"));
const client_1 = require("@prisma/client");
let TeachersService = class TeachersService {
    prisma;
    uploadService;
    constructor(prisma, uploadService) {
        this.prisma = prisma;
        this.uploadService = uploadService;
    }
    calculateAge(dob) {
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate()))
            age--;
        return age;
    }
    async findAll() {
        const teachers = await this.prisma.teacher.findMany({
            include: {
                user: true,
                assignments: { include: { class: true } },
            },
            orderBy: { name: 'asc' },
        });
        return Promise.all(teachers.map(async (t) => ({
            id: t.id,
            userId: t.userId,
            name: t.name,
            dob: t.dob.toISOString(),
            age: this.calculateAge(t.dob),
            contactNumber: t.contactNumber,
            photoFileId: t.photoFileId,
            photoUrl: await this.uploadService.getFileUrlByFileId(t.photoFileId),
            assignedClasses: t.assignments.map((a) => ({
                id: a.class.id,
                name: a.class.name,
                grade: a.class.grade,
            })),
        })));
    }
    async findOne(id) {
        const teacher = await this.prisma.teacher.findUnique({
            where: { id },
            include: {
                user: true,
                assignments: { include: { class: true } },
                attendance: { include: { classSession: true } },
            },
        });
        if (!teacher)
            throw new common_1.NotFoundException('Teacher not found');
        const totalSessions = teacher.attendance.length;
        const present = teacher.attendance.filter((a) => a.status === 'PRESENT').length;
        const absent = teacher.attendance.filter((a) => a.status === 'ABSENT').length;
        return {
            id: teacher.id,
            userId: teacher.userId,
            name: teacher.name,
            dob: teacher.dob.toISOString(),
            age: this.calculateAge(teacher.dob),
            contactNumber: teacher.contactNumber,
            photoFileId: teacher.photoFileId,
            photoUrl: await this.uploadService.getFileUrlByFileId(teacher.photoFileId),
            assignedClasses: teacher.assignments.map((a) => ({
                id: a.class.id,
                name: a.class.name,
                grade: a.class.grade,
            })),
            attendanceSummary: {
                totalSessions,
                present,
                absent,
                percentage: totalSessions > 0 ? Math.round((present / totalSessions) * 100) : 0,
            },
            createdAt: teacher.createdAt.toISOString(),
        };
    }
    async create(data) {
        const hashed = await bcrypt.hash(data.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                password: hashed,
                name: data.name,
                role: client_1.UserRole.TEACHER,
            },
        });
        const teacher = await this.prisma.teacher.create({
            data: {
                userId: user.id,
                name: data.name,
                dob: new Date(data.dob),
                contactNumber: data.contactNumber,
                photoFileId: data.photoFileId ?? null,
                assignments: data.classIds?.length
                    ? { create: data.classIds.map((cid) => ({ classId: cid })) }
                    : undefined,
            },
        });
        return this.findOne(teacher.id);
    }
    async update(id, data) {
        await this.prisma.teacher.update({
            where: { id },
            data: {
                ...(data.name !== undefined ? { name: data.name } : {}),
                ...(data.dob !== undefined ? { dob: new Date(data.dob) } : {}),
                ...(data.contactNumber !== undefined ? { contactNumber: data.contactNumber } : {}),
                ...(data.photoFileId !== undefined ? { photoFileId: data.photoFileId } : {}),
            },
        });
        return this.findOne(id);
    }
    async remove(id) {
        const teacher = await this.prisma.teacher.findUnique({ where: { id } });
        if (!teacher)
            throw new common_1.NotFoundException('Teacher not found');
        await this.prisma.teacher.delete({ where: { id } });
        await this.prisma.user.delete({ where: { id: teacher.userId } });
        return { success: true };
    }
};
exports.TeachersService = TeachersService;
exports.TeachersService = TeachersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], TeachersService);
//# sourceMappingURL=teachers.service.js.map