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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const upload_service_1 = require("../upload/upload.service");
let StudentsService = class StudentsService {
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
    async findAll(search, classId, page = 1, limit = 20, teacherClassIds) {
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { parentName: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (classId) {
            where.enrollments = { some: { classId, status: 'ACTIVE' } };
        }
        if (teacherClassIds) {
            where.enrollments = { some: { classId: { in: teacherClassIds }, status: 'ACTIVE' } };
        }
        const [items, total] = await Promise.all([
            this.prisma.student.findMany({
                where,
                include: {
                    enrollments: { include: { class: true }, where: { status: 'ACTIVE' } },
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { name: 'asc' },
            }),
            this.prisma.student.count({ where }),
        ]);
        const mappedItems = await Promise.all(items.map(async (s) => ({
            id: s.id,
            name: s.name,
            parentName: s.parentName,
            dob: s.dob.toISOString(),
            age: this.calculateAge(s.dob),
            contactNumber: s.contactNumber,
            photoFileId: s.photoFileId,
            photoUrl: await this.uploadService.getFileUrlByFileId(s.photoFileId),
            enrolledClasses: s.enrollments.map((e) => ({
                id: e.class.id,
                name: e.class.name,
                grade: e.class.grade,
            })),
        })));
        return {
            items: mappedItems,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const student = await this.prisma.student.findUnique({
            where: { id },
            include: {
                enrollments: { include: { class: true } },
                attendance: {
                    include: { classSession: { include: { class: true } } },
                    orderBy: { classSession: { date: 'desc' } },
                },
                progress: {
                    include: {
                        progressMetric: { include: { class: true } },
                        classSession: true,
                    },
                    orderBy: { classSession: { date: 'asc' } },
                },
                feedback: {
                    where: { type: 'STUDENT_SPECIFIC' },
                    include: {
                        classSession: { include: { class: true } },
                        teacher: true,
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 20,
                },
                classHistory: {
                    include: { class: true, academicYear: true },
                    orderBy: { date: 'desc' },
                },
            },
        });
        if (!student)
            throw new common_1.NotFoundException('Student not found');
        const photoUrl = await this.uploadService.getFileUrlByFileId(student.photoFileId);
        const totalSessions = student.attendance.length;
        const present = student.attendance.filter((a) => a.status === 'PRESENT').length;
        const absent = student.attendance.filter((a) => a.status === 'ABSENT').length;
        const late = student.attendance.filter((a) => a.status === 'LATE').length;
        const excused = student.attendance.filter((a) => a.status === 'EXCUSED').length;
        const classMap = new Map();
        for (const a of student.attendance) {
            const cid = a.classSession.classId;
            if (!classMap.has(cid)) {
                classMap.set(cid, { classId: cid, className: a.classSession.class.name, present: 0, total: 0 });
            }
            const entry = classMap.get(cid);
            entry.total++;
            if (a.status === 'PRESENT' || a.status === 'LATE')
                entry.present++;
        }
        const metricMap = new Map();
        for (const p of student.progress) {
            const mid = p.progressMetricId;
            if (!metricMap.has(mid)) {
                metricMap.set(mid, {
                    metricId: mid,
                    metricName: p.progressMetric.name,
                    metricType: p.progressMetric.type,
                    classId: p.progressMetric.classId,
                    className: p.progressMetric.class.name,
                    entries: [],
                });
            }
            metricMap.get(mid).entries.push({
                date: p.classSession.date.toISOString(),
                value: p.value,
                notes: p.notes,
            });
        }
        return {
            id: student.id,
            name: student.name,
            parentName: student.parentName,
            dob: student.dob.toISOString(),
            age: this.calculateAge(student.dob),
            contactNumber: student.contactNumber,
            photoFileId: student.photoFileId,
            photoUrl,
            enrollments: student.enrollments.map((e) => ({
                id: e.id,
                classId: e.classId,
                className: e.class.name,
                classGrade: e.class.grade,
                enrollmentDate: e.enrollmentDate.toISOString(),
                status: e.status,
            })),
            attendanceSummary: {
                totalSessions,
                present,
                absent,
                late,
                excused,
                percentage: totalSessions > 0 ? Math.round(((present + late) / totalSessions) * 100) : 0,
                perClass: Array.from(classMap.values()).map((c) => ({
                    classId: c.classId,
                    className: c.className,
                    percentage: c.total > 0 ? Math.round((c.present / c.total) * 100) : 0,
                    total: c.total,
                    present: c.present,
                })),
            },
            recentAttendance: student.attendance.slice(0, 10).map((a) => ({
                date: a.classSession.date.toISOString(),
                className: a.classSession.class.name,
                status: a.status,
            })),
            progress: Array.from(metricMap.values()),
            feedback: student.feedback.map((f) => ({
                id: f.id,
                date: f.classSession.date.toISOString(),
                className: f.classSession.class.name,
                teacherName: f.teacher.name,
                content: f.content,
            })),
            classHistory: student.classHistory.map((h) => ({
                id: h.id,
                classId: h.classId,
                className: h.class.name,
                academicYearName: h.academicYear.name,
                action: h.action,
                date: h.date.toISOString(),
            })),
            createdAt: student.createdAt.toISOString(),
        };
    }
    async create(data) {
        const student = await this.prisma.student.create({
            data: {
                name: data.name,
                parentName: data.parentName,
                dob: new Date(data.dob),
                contactNumber: data.contactNumber,
                photoFileId: data.photoFileId ?? null,
                enrollments: data.classIds?.length
                    ? { create: data.classIds.map((cid) => ({ classId: cid })) }
                    : undefined,
            },
        });
        return this.findOne(student.id);
    }
    async update(id, data) {
        await this.prisma.student.update({
            where: { id },
            data: {
                ...(data.name !== undefined ? { name: data.name } : {}),
                ...(data.parentName !== undefined ? { parentName: data.parentName } : {}),
                ...(data.dob !== undefined ? { dob: new Date(data.dob) } : {}),
                ...(data.contactNumber !== undefined ? { contactNumber: data.contactNumber } : {}),
                ...(data.photoFileId !== undefined ? { photoFileId: data.photoFileId } : {}),
            },
        });
        return this.findOne(id);
    }
    async remove(id) {
        await this.prisma.student.delete({ where: { id } });
        return { success: true };
    }
    async addEnrollment(studentId, classId) {
        const enrollment = await this.prisma.classEnrollment.create({
            data: { studentId, classId },
        });
        return {
            id: enrollment.id,
            studentId: enrollment.studentId,
            classId: enrollment.classId,
            enrollmentDate: enrollment.enrollmentDate.toISOString(),
            status: enrollment.status,
        };
    }
    async updateEnrollment(enrollmentId, status) {
        const enrollment = await this.prisma.classEnrollment.update({
            where: { id: enrollmentId },
            data: { status: status },
        });
        return { id: enrollment.id, status: enrollment.status };
    }
    async deleteEnrollment(enrollmentId) {
        await this.prisma.classEnrollment.delete({ where: { id: enrollmentId } });
        return { success: true };
    }
    async addClassHistory(studentId, classId, academicYearId, action) {
        const entry = await this.prisma.studentClassHistory.create({
            data: { studentId, classId, academicYearId, action: action },
            include: { class: true, academicYear: true },
        });
        return {
            id: entry.id,
            studentId: entry.studentId,
            classId: entry.classId,
            className: entry.class.name,
            academicYearId: entry.academicYearId,
            academicYearName: entry.academicYear.name,
            action: entry.action,
            date: entry.date.toISOString(),
        };
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], StudentsService);
//# sourceMappingURL=students.service.js.map