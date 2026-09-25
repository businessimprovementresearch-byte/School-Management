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
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const active_academic_year_1 = require("../common/active-academic-year");
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
    async safeFileUrl(fileId) {
        return this.uploadService.getFileUrlByFileId(fileId);
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
            email: t.user.email,
            isActive: t.isActive,
            dob: t.dob ? t.dob.toISOString() : null,
            age: this.calculateAge(t.dob),
            contactNumber: t.contactNumber,
            remarks: t.remarks,
            photoFileId: t.photoFileId,
            photoUrl: await this.safeFileUrl(t.photoFileId),
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
            throw new common_1.NotFoundException('Teacher not found');
        const totalSessions = teacher.attendance.length;
        const present = teacher.attendance.filter((a) => a.status === 'PRESENT').length;
        const absent = teacher.attendance.filter((a) => a.status === 'ABSENT').length;
        const yearMap = new Map();
        for (const a of teacher.assignments) {
            const yearId = a.academicYearId;
            if (!yearMap.has(yearId)) {
                yearMap.set(yearId, {
                    academicYearId: yearId,
                    academicYearName: a.academicYear.name,
                    startDate: a.academicYear.startDate,
                    classes: [],
                });
            }
            yearMap.get(yearId).classes.push({
                id: a.class.id,
                name: a.class.name,
                grade: a.class.grade,
            });
        }
        const teachingHistory = Array.from(yearMap.values())
            .sort((a, b) => b.startDate.getTime() - a.startDate.getTime())
            .map((y) => ({
            academicYearId: y.academicYearId,
            academicYearName: y.academicYearName,
            classes: y.classes,
        }));
        return {
            id: teacher.id,
            userId: teacher.userId,
            name: teacher.name,
            nickname: teacher.nickname,
            email: teacher.user.email,
            isActive: teacher.isActive,
            dob: teacher.dob ? teacher.dob.toISOString() : null,
            age: this.calculateAge(teacher.dob),
            contactNumber: teacher.contactNumber,
            remarks: teacher.remarks,
            photoFileId: teacher.photoFileId,
            photoUrl: await this.safeFileUrl(teacher.photoFileId),
            assignedClasses: teacher.assignments.map((a) => ({
                id: a.class.id,
                name: a.class.name,
                grade: a.class.grade,
            })),
            assignedClassIds: teacher.assignments.map((a) => a.class.id),
            teachingHistory,
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
        let email = data.email?.trim() || undefined;
        let password = data.password?.trim() || undefined;
        if (!email) {
            const base = (data.name || 'teacher')
                .toLowerCase()
                .replace(/\s+/g, '.')
                .replace(/[^a-z0-9.]/g, '');
            const candidate = `${base}.${Date.now()}@noemail.local`;
            email = candidate;
        }
        if (!password) {
            password = `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
        }
        const existing = await this.prisma.user.findUnique({ where: { email } });
        if (existing) {
            throw new common_1.ConflictException('Email already in use');
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashed,
                name: data.name,
                role: client_1.UserRole.TEACHER,
            },
        });
        const academicYearId = data.classIds?.length
            ? await (0, active_academic_year_1.requireAcademicYearId)(this.prisma)
            : undefined;
        const teacher = await this.prisma.teacher.create({
            data: {
                userId: user.id,
                name: data.name,
                nickname: data.nickname ?? null,
                isActive: data.isActive ?? true,
                dob: data.dob ? new Date(data.dob) : null,
                contactNumber: data.contactNumber ?? null,
                remarks: data.remarks ?? null,
                photoFileId: data.photoFileId ?? null,
                assignments: data.classIds?.length
                    ? {
                        create: data.classIds.map((cid) => ({
                            classId: cid,
                            academicYearId: academicYearId,
                        })),
                    }
                    : undefined,
            },
        });
        return this.findOne(teacher.id);
    }
    async update(id, data) {
        const teacher = await this.prisma.teacher.findUnique({
            where: { id },
            include: { user: true, assignments: true },
        });
        if (!teacher)
            throw new common_1.NotFoundException('Teacher not found');
        const dataToUpdate = {};
        if (data.name !== undefined)
            dataToUpdate.name = data.name;
        if (data.nickname !== undefined)
            dataToUpdate.nickname = data.nickname;
        if (data.isActive !== undefined)
            dataToUpdate.isActive = data.isActive;
        if (data.dob !== undefined)
            dataToUpdate.dob = data.dob ? new Date(data.dob) : null;
        if (data.contactNumber !== undefined)
            dataToUpdate.contactNumber = data.contactNumber;
        if (data.remarks !== undefined)
            dataToUpdate.remarks = data.remarks;
        if (data.photoFileId !== undefined)
            dataToUpdate.photoFileId = data.photoFileId;
        await this.prisma.teacher.update({ where: { id }, data: dataToUpdate });
        const userData = {};
        if (data.email && data.email !== teacher.user.email) {
            const existing = await this.prisma.user.findUnique({
                where: { email: data.email },
            });
            if (existing && existing.id !== teacher.userId) {
                throw new common_1.ConflictException('Email already in use');
            }
            userData.email = data.email;
        }
        if (data.password) {
            userData.password = await bcrypt.hash(data.password, 10);
        }
        if (Object.keys(userData).length > 0) {
            await this.prisma.user.update({
                where: { id: teacher.userId },
                data: userData,
            });
        }
        if (data.classIds !== undefined) {
            const academicYearId = await (0, active_academic_year_1.requireAcademicYearId)(this.prisma);
            const newIds = new Set(data.classIds);
            const current = teacher.assignments.filter((a) => a.academicYearId === academicYearId);
            const toRemove = current.filter((a) => !newIds.has(a.classId));
            if (toRemove.length > 0) {
                await this.prisma.teacherAssignment.deleteMany({
                    where: { id: { in: toRemove.map((a) => a.id) } },
                });
            }
            const toAdd = [...newIds].filter((cid) => !current.some((a) => a.classId === cid));
            if (toAdd.length > 0) {
                await this.prisma.teacherAssignment.createMany({
                    data: toAdd.map((classId) => ({
                        teacherId: id,
                        classId,
                        academicYearId,
                    })),
                    skipDuplicates: true,
                });
            }
        }
        return this.findOne(id);
    }
    async setActive(id, isActive) {
        const teacher = await this.prisma.teacher.findUnique({ where: { id } });
        if (!teacher)
            throw new common_1.NotFoundException('Teacher not found');
        await this.prisma.teacher.update({ where: { id }, data: { isActive } });
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
    async findAvailableByClass(classId, academicYearId) {
        const yearId = await (0, active_academic_year_1.requireAcademicYearId)(this.prisma, academicYearId).catch(() => null);
        const assignedIds = yearId
            ? (await this.prisma.teacherAssignment.findMany({
                where: { classId, academicYearId: yearId },
                select: { teacherId: true },
            })).map((a) => a.teacherId)
            : [];
        const teachers = await this.prisma.teacher.findMany({
            where: {
                isActive: true,
                ...(assignedIds.length ? { id: { notIn: assignedIds } } : {}),
            },
            include: { user: true },
            orderBy: { name: 'asc' },
        });
        return teachers.map((t) => ({
            id: t.id,
            userId: t.userId,
            name: t.name,
            nickname: t.nickname,
            isActive: t.isActive,
            photoFileId: t.photoFileId,
            photoUrl: null,
        }));
    }
};
exports.TeachersService = TeachersService;
exports.TeachersService = TeachersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], TeachersService);
//# sourceMappingURL=teachers.service.js.map