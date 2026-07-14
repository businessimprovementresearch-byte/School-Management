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
};
exports.SessionsService = SessionsService;
exports.SessionsService = SessionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], SessionsService);
//# sourceMappingURL=sessions.service.js.map