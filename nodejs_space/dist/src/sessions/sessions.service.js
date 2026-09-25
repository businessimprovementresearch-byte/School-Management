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
exports.SessionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const upload_service_1 = require("../upload/upload.service");
let SessionsService = class SessionsService {
    prisma;
    uploadService;
    constructor(prisma, uploadService) {
        this.prisma = prisma;
        this.uploadService = uploadService;
    }
    async create(classId, date, academicYearId, termId) {
        const session = await this.prisma.classSession.create({
            data: {
                classId,
                date: new Date(date),
                academicYearId,
                termId: termId ?? null,
            },
        });
        return this.findOne(session.id);
    }
    async findOne(id) {
        const session = await this.prisma.classSession.findUnique({
            where: { id },
            include: {
                class: {
                    include: {
                        enrollments: {
                            where: { status: 'ACTIVE' },
                            include: { student: true },
                        },
                        assignments: { include: { teacher: true } },
                    },
                },
                academicYear: true,
                term: true,
                studentAttendance: true,
                teacherAttendance: true,
                feedback: {
                    include: { teacher: true, student: true },
                    orderBy: { createdAt: 'desc' },
                },
            },
        });
        if (!session)
            throw new common_1.NotFoundException('Session not found');
        const attendanceMap = new Map(session.studentAttendance.map((a) => [a.studentId, a.status]));
        const teacherAttMap = new Map(session.teacherAttendance.map((a) => [a.teacherId, a.status]));
        return {
            id: session.id,
            classId: session.classId,
            className: session.class.name,
            classGrade: session.class.grade,
            date: session.date.toISOString(),
            academicYearId: session.academicYearId,
            academicYearName: session.academicYear.name,
            termId: session.termId,
            termName: session.term?.name ?? null,
            attendanceSubmitted: session.studentAttendance.length > 0,
            isHoliday: session.isHoliday,
            students: await Promise.all(session.class.enrollments.map(async (e) => ({
                id: e.student.id,
                name: e.student.name,
                photoFileId: e.student.photoFileId,
                photoUrl: await this.uploadService.getFileUrlByFileId(e.student.photoFileId),
                attendanceStatus: attendanceMap.get(e.student.id) ?? null,
            }))),
            teacherAttendance: session.class.assignments.map((a) => ({
                teacherId: a.teacher.id,
                teacherName: a.teacher.name,
                status: teacherAttMap.get(a.teacher.id) ?? null,
            })),
            feedback: session.feedback.map((f) => ({
                id: f.id,
                teacherName: f.teacher.name,
                content: f.content,
                type: f.type,
                studentId: f.studentId,
                studentName: f.student?.name ?? null,
                createdAt: f.createdAt.toISOString(),
            })),
        };
    }
    async remove(id) {
        await this.prisma.classSession.delete({ where: { id } });
        return { success: true };
    }
    async setHoliday(id, isHoliday) {
        const session = await this.prisma.classSession.findUnique({
            where: { id },
        });
        if (!session)
            throw new common_1.NotFoundException('Session not found');
        await this.prisma.classSession.update({
            where: { id },
            data: { isHoliday },
        });
        return this.findOne(id);
    }
    async bulkCreateForDate(date, academicYearId, termId) {
        const day = new Date(date);
        const startOfDay = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0);
        const endOfDay = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59, 999);
        let yearId = academicYearId;
        if (!yearId) {
            const activeYear = await this.prisma.academicYear.findFirst({
                where: { isActive: true },
            });
            if (!activeYear) {
                throw new common_1.BadRequestException('No active academic year found; specify academicYearId');
            }
            yearId = activeYear.id;
        }
        const inactiveClassIds = (await this.prisma.classYearStatus.findMany({
            where: { academicYearId: yearId, isActive: false },
            select: { classId: true },
        })).map((r) => r.classId);
        const classes = await this.prisma.class.findMany({
            where: inactiveClassIds.length ? { id: { notIn: inactiveClassIds } } : {},
            include: {
                sessions: { where: { date: { gte: startOfDay, lte: endOfDay } } },
            },
            orderBy: { name: 'asc' },
        });
        const createdClassNames = [];
        const skippedClassNames = [];
        for (const cls of classes) {
            if (cls.sessions.length > 0) {
                skippedClassNames.push(cls.name);
                continue;
            }
            await this.prisma.classSession.create({
                data: {
                    classId: cls.id,
                    date: startOfDay,
                    academicYearId: yearId,
                    termId: termId ?? null,
                },
            });
            createdClassNames.push(cls.name);
        }
        return {
            success: true,
            date: startOfDay.toISOString(),
            totalClasses: classes.length,
            createdCount: createdClassNames.length,
            skippedCount: skippedClassNames.length,
            createdClassNames,
            skippedClassNames,
        };
    }
};
exports.SessionsService = SessionsService;
exports.SessionsService = SessionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], SessionsService);
//# sourceMappingURL=sessions.service.js.map