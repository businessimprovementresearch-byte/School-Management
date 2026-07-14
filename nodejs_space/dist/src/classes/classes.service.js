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
exports.ClassesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const upload_service_1 = require("../upload/upload.service");
let ClassesService = class ClassesService {
    prisma;
    uploadService;
    constructor(prisma, uploadService) {
        this.prisma = prisma;
        this.uploadService = uploadService;
    }
    async findAll(teacherClassIds) {
        const where = teacherClassIds ? { id: { in: teacherClassIds } } : {};
        const classes = await this.prisma.class.findMany({
            where,
            include: {
                enrollments: { where: { status: 'ACTIVE' } },
                assignments: { include: { teacher: true } },
                sessions: { orderBy: { date: 'desc' }, take: 1 },
            },
            orderBy: { name: 'asc' },
        });
        return Promise.all(classes.map(async (c) => ({
            id: c.id,
            name: c.name,
            grade: c.grade,
            description: c.description,
            studentCount: c.enrollments.length,
            teachers: await Promise.all(c.assignments.map(async (a) => ({
                id: a.teacher.id,
                name: a.teacher.name,
                photoFileId: a.teacher.photoFileId,
                photoUrl: await this.uploadService.getFileUrlByFileId(a.teacher.photoFileId),
            }))),
            nextSessionDate: c.sessions?.[0]?.date?.toISOString() ?? null,
        })));
    }
    async findOne(id) {
        const cls = await this.prisma.class.findUnique({
            where: { id },
            include: {
                assignments: { include: { teacher: true } },
                enrollments: { include: { student: true } },
                sessions: {
                    include: {
                        studentAttendance: true,
                        term: true,
                    },
                    orderBy: { date: 'desc' },
                    take: 50,
                },
                metrics: true,
            },
        });
        if (!cls)
            throw new common_1.NotFoundException('Class not found');
        return {
            id: cls.id,
            name: cls.name,
            grade: cls.grade,
            description: cls.description,
            teachers: await Promise.all(cls.assignments.map(async (a) => ({
                id: a.teacher.id,
                name: a.teacher.name,
                photoFileId: a.teacher.photoFileId,
                photoUrl: await this.uploadService.getFileUrlByFileId(a.teacher.photoFileId),
            }))),
            students: await Promise.all(cls.enrollments.map(async (e) => ({
                id: e.student.id,
                name: e.student.name,
                photoFileId: e.student.photoFileId,
                photoUrl: await this.uploadService.getFileUrlByFileId(e.student.photoFileId),
                enrollmentStatus: e.status,
            }))),
            sessions: cls.sessions.map((s) => ({
                id: s.id,
                date: s.date.toISOString(),
                attendanceSubmitted: s.studentAttendance.length > 0,
                termName: s.term?.name ?? null,
            })),
            metrics: cls.metrics.map((m) => ({
                id: m.id,
                name: m.name,
                type: m.type,
                description: m.description,
            })),
        };
    }
    async assignTeacher(classId, teacherId) {
        const assignment = await this.prisma.teacherAssignment.create({
            data: { classId, teacherId },
        });
        return { id: assignment.id, classId: assignment.classId, teacherId: assignment.teacherId };
    }
    async removeTeacher(classId, teacherId) {
        await this.prisma.teacherAssignment.deleteMany({ where: { classId, teacherId } });
        return { success: true };
    }
};
exports.ClassesService = ClassesService;
exports.ClassesService = ClassesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], ClassesService);
//# sourceMappingURL=classes.service.js.map