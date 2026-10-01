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
        if (!dob)
            return null;
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
            nickname: t.nickname,
            title: t.title,
            address: t.address,
            isActive: t.isActive,
            email: t.user.email,
            dob: t.dob ? t.dob.toISOString() : null,
            age: this.calculateAge(t.dob),
            contactNumber: t.contactNumber,
            remarks: t.remarks,
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
                assignments: { include: { class: true, academicYear: true } },
                attendance: { include: { classSession: true } },
            },
        });
        if (!teacher)
            throw new common_1.NotFoundException('Guru tidak ditemukan');
        const totalSessions = teacher.attendance.length;
        const presentCount = teacher.attendance.filter((a) => a.status === 'PRESENT').length;
        const absentCount = teacher.attendance.filter((a) => a.status === 'ABSENT').length;
        return {
            id: teacher.id,
            userId: teacher.userId,
            name: teacher.name,
            nickname: teacher.nickname,
            title: teacher.title,
            address: teacher.address,
            email: teacher.user.email,
            isActive: teacher.isActive,
            dob: teacher.dob ? teacher.dob.toISOString() : null,
            age: this.calculateAge(teacher.dob),
            contactNumber: teacher.contactNumber,
            remarks: teacher.remarks,
            photoFileId: teacher.photoFileId,
            photoUrl: await this.uploadService.getFileUrlByFileId(teacher.photoFileId),
            assignedClasses: teacher.assignments.map((a) => ({
                id: a.class.id,
                name: a.class.name,
                grade: a.class.grade,
            })),
            assignedClassIds: teacher.assignments.map((a) => a.classId),
            teachingHistory: [],
            attendanceSummary: {
                totalSessions,
                present: presentCount,
                absent: absentCount,
                percentage: totalSessions > 0 ? Math.round((presentCount / totalSessions) * 100) : 0,
            },
            createdAt: teacher.createdAt.toISOString(),
        };
    }
    async create(dto) {
        const email = dto.email || `teacher_${Date.now()}@school.internal`;
        const password = dto.password || 'password123';
        const name = dto.name?.trim() || null;
        const userName = name || dto.nickname?.trim() || email.split('@')[0] || 'Teacher';
        const existingUser = await this.prisma.user.findUnique({ where: { email } });
        if (existingUser)
            throw new common_1.ConflictException('Email sudah digunakan');
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: userName,
                role: client_1.UserRole.TEACHER,
            },
        });
        const teacher = await this.prisma.teacher.create({
            data: {
                userId: user.id,
                name,
                nickname: dto.nickname || null,
                title: dto.title || null,
                address: dto.address || null,
                isActive: dto.isActive ?? true,
                dob: dto.dob ? new Date(dto.dob) : null,
                contactNumber: dto.contactNumber || null,
                remarks: dto.remarks || null,
                photoFileId: dto.photoFileId || null,
            },
        });
        if (dto.classIds && dto.classIds.length > 0) {
            const activeYear = await this.prisma.academicYear.findFirst({ where: { isActive: true } });
            if (activeYear) {
                await this.prisma.teacherAssignment.createMany({
                    data: dto.classIds.map((classId) => ({
                        teacherId: teacher.id,
                        classId,
                        academicYearId: activeYear.id,
                    })),
                });
            }
        }
        return this.findOne(teacher.id);
    }
    async update(id, dto) {
        const teacher = await this.prisma.teacher.findUnique({ where: { id }, include: { user: true } });
        if (!teacher)
            throw new common_1.NotFoundException('Guru tidak ditemukan');
        if (dto.email || dto.password || dto.name !== undefined || dto.nickname !== undefined) {
            const userUpdateData = {};
            if (dto.email) {
                const emailExists = await this.prisma.user.findFirst({
                    where: { email: dto.email, NOT: { id: teacher.userId } },
                });
                if (emailExists)
                    throw new common_1.ConflictException('Email sudah digunakan oleh pengguna lain');
                userUpdateData.email = dto.email;
            }
            if (dto.password) {
                userUpdateData.password = await bcrypt.hash(dto.password, 10);
            }
            if (dto.name !== undefined || dto.nickname !== undefined) {
                userUpdateData.name =
                    dto.name?.trim() ||
                        (dto.nickname !== undefined ? dto.nickname.trim() : teacher.nickname?.trim()) ||
                        (dto.email || teacher.user.email).split('@')[0] ||
                        'Teacher';
            }
            await this.prisma.user.update({
                where: { id: teacher.userId },
                data: userUpdateData,
            });
        }
        await this.prisma.teacher.update({
            where: { id },
            data: {
                ...(dto.name !== undefined && { name: dto.name?.trim() || null }),
                ...(dto.nickname !== undefined && { nickname: dto.nickname }),
                ...(dto.title !== undefined && { title: dto.title?.trim() || null }),
                ...(dto.address !== undefined && { address: dto.address?.trim() || null }),
                ...(dto.isActive !== undefined && { isActive: dto.isActive }),
                ...(dto.dob !== undefined && { dob: dto.dob ? new Date(dto.dob) : null }),
                ...(dto.contactNumber !== undefined && { contactNumber: dto.contactNumber }),
                ...(dto.remarks !== undefined && { remarks: dto.remarks }),
                ...(dto.photoFileId !== undefined && { photoFileId: dto.photoFileId }),
            },
        });
        if (dto.classIds !== undefined) {
            const activeYear = await this.prisma.academicYear.findFirst({ where: { isActive: true } });
            if (activeYear) {
                await this.prisma.teacherAssignment.deleteMany({
                    where: { teacherId: id, academicYearId: activeYear.id },
                });
                if (dto.classIds.length > 0) {
                    await this.prisma.teacherAssignment.createMany({
                        data: dto.classIds.map((classId) => ({
                            teacherId: id,
                            classId,
                            academicYearId: activeYear.id,
                        })),
                    });
                }
            }
        }
        return this.findOne(id);
    }
    async setActive(id, isActive) {
        const teacher = await this.prisma.teacher.findUnique({ where: { id } });
        if (!teacher)
            throw new common_1.NotFoundException('Guru tidak ditemukan');
        await this.prisma.teacher.update({
            where: { id },
            data: { isActive },
        });
        return this.findOne(id);
    }
    async remove(id) {
        const teacher = await this.prisma.teacher.findUnique({ where: { id } });
        if (!teacher)
            throw new common_1.NotFoundException('Guru tidak ditemukan');
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