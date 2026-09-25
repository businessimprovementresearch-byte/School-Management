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
const active_academic_year_1 = require("../common/active-academic-year");
let StudentsService = class StudentsService {
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
    async findAll(search, classId, page = 1, limit = 20, teacherClassIds, includeInactive = false) {
        const where = {};
        const activeYearId = await (0, active_academic_year_1.requireAcademicYearId)(this.prisma).catch(() => null);
        if (!includeInactive) {
            where.isActive = true;
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { nickname: { contains: search, mode: 'insensitive' } },
                { parentName: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (classId) {
            where.enrollments = {
                some: {
                    classId,
                    status: 'ACTIVE',
                    ...(activeYearId ? { academicYearId: activeYearId } : {}),
                },
            };
        }
        if (teacherClassIds) {
            where.enrollments = {
                some: {
                    classId: { in: teacherClassIds },
                    status: 'ACTIVE',
                    ...(activeYearId ? { academicYearId: activeYearId } : {}),
                },
            };
        }
        const [items, total] = await Promise.all([
            this.prisma.student.findMany({
                where,
                include: {
                    enrollments: {
                        include: { class: true },
                        where: activeYearId
                            ? { status: 'ACTIVE', academicYearId: activeYearId }
                            : { status: 'ACTIVE' },
                    },
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { name: 'asc' },
            }),
            this.prisma.student.count({ where }),
        ]);
        const mappedItems = await Promise.all(items.map(async (s) => ({
            id: s.id,
            studentIdNumber: s.studentIdNumber,
            name: s.name,
            nickname: s.nickname,
            parentName: s.parentName,
            dob: s.dob ? s.dob.toISOString() : null,
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
        const activeYearId = await (0, active_academic_year_1.requireAcademicYearId)(this.prisma).catch(() => null);
        const student = await this.prisma.student.findUnique({
            where: { id },
            include: {
                enrollments: {
                    include: { class: true, academicYear: true },
                    orderBy: { academicYear: { startDate: 'desc' } },
                },
                attendance: {
                    where: activeYearId
                        ? { classSession: { academicYearId: activeYearId } }
                        : undefined,
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
        const unsure = student.attendance.filter((a) => a.status === 'UNSURE').length;
        const classMap = new Map();
        for (const a of student.attendance) {
            const cid = a.classSession.classId;
            if (!classMap.has(cid)) {
                classMap.set(cid, {
                    classId: cid,
                    className: a.classSession.class.name,
                    present: 0,
                    total: 0,
                });
            }
            const entry = classMap.get(cid);
            entry.total++;
            if (a.status === 'PRESENT')
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
            studentIdNumber: student.studentIdNumber,
            name: student.name,
            nickname: student.nickname,
            isActive: student.isActive,
            parentName: student.parentName,
            dob: student.dob ? student.dob.toISOString() : null,
            age: this.calculateAge(student.dob),
            contactNumber: student.contactNumber,
            studentContactNumber: student.studentContactNumber,
            remarks: student.remarks,
            photoFileId: student.photoFileId,
            photoUrl,
            enrollments: student.enrollments.map((e) => ({
                id: e.id,
                classId: e.classId,
                className: e.class.name,
                classGrade: e.class.grade,
                academicYearId: e.academicYearId,
                academicYearName: e.academicYear.name,
                enrollmentDate: e.enrollmentDate.toISOString(),
                status: e.status,
            })),
            attendanceSummary: {
                totalSessions,
                present,
                absent,
                unsure,
                late: 0,
                excused: 0,
                percentage: totalSessions > 0 ? Math.round((present / totalSessions) * 100) : 0,
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
        const academicYearId = data.classIds?.length
            ? await (0, active_academic_year_1.requireAcademicYearId)(this.prisma)
            : undefined;
        const student = await this.prisma.student.create({
            data: {
                studentIdNumber: data.studentIdNumber ?? null,
                name: data.name,
                nickname: data.nickname ?? null,
                parentName: data.parentName ?? null,
                dob: data.dob ? new Date(data.dob) : null,
                contactNumber: data.contactNumber ?? null,
                studentContactNumber: data.studentContactNumber ?? null,
                remarks: data.remarks ?? null,
                photoFileId: data.photoFileId ?? null,
                enrollments: data.classIds?.length
                    ? {
                        create: data.classIds.map((cid) => ({
                            classId: cid,
                            academicYearId: academicYearId,
                        })),
                    }
                    : undefined,
            },
        });
        return this.findOne(student.id);
    }
    async update(id, data) {
        await this.prisma.student.update({
            where: { id },
            data: {
                ...(data.studentIdNumber !== undefined
                    ? { studentIdNumber: data.studentIdNumber }
                    : {}),
                ...(data.name !== undefined ? { name: data.name } : {}),
                ...(data.nickname !== undefined ? { nickname: data.nickname } : {}),
                ...(data.parentName !== undefined
                    ? { parentName: data.parentName }
                    : {}),
                ...(data.dob !== undefined ? { dob: new Date(data.dob) } : {}),
                ...(data.contactNumber !== undefined
                    ? { contactNumber: data.contactNumber }
                    : {}),
                ...(data.studentContactNumber !== undefined
                    ? { studentContactNumber: data.studentContactNumber }
                    : {}),
                ...(data.remarks !== undefined ? { remarks: data.remarks } : {}),
                ...(data.photoFileId !== undefined
                    ? { photoFileId: data.photoFileId }
                    : {}),
                ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
            },
        });
        return this.findOne(id);
    }
    async remove(id) {
        await this.prisma.student.delete({ where: { id } });
        return { success: true };
    }
    async addEnrollment(studentId, classId, academicYearId) {
        const yearId = await (0, active_academic_year_1.requireAcademicYearId)(this.prisma, academicYearId);
        const existing = await this.prisma.classEnrollment.findUnique({
            where: {
                studentId_classId_academicYearId: {
                    studentId,
                    classId,
                    academicYearId: yearId,
                },
            },
        });
        const enrollment = existing ??
            (await this.prisma.classEnrollment.create({
                data: { studentId, classId, academicYearId: yearId },
            }));
        if (!existing) {
            await this.prisma.studentClassHistory.create({
                data: {
                    studentId,
                    classId,
                    academicYearId: yearId,
                    action: 'ENROLLED',
                },
            });
        }
        return {
            id: enrollment.id,
            studentId: enrollment.studentId,
            classId: enrollment.classId,
            academicYearId: enrollment.academicYearId,
            enrollmentDate: enrollment.enrollmentDate.toISOString(),
            status: enrollment.status,
        };
    }
    async updateEnrollment(enrollmentId, data) {
        const existing = await this.prisma.classEnrollment.findUnique({
            where: { id: enrollmentId },
        });
        const enrollment = await this.prisma.classEnrollment.update({
            where: { id: enrollmentId },
            data: {
                ...(data.status
                    ? { status: data.status }
                    : {}),
                ...(data.classId ? { classId: data.classId } : {}),
            },
            include: { class: true, academicYear: true },
        });
        if (data.classId && existing && data.classId !== existing.classId) {
            await this.prisma.studentClassHistory.create({
                data: {
                    studentId: enrollment.studentId,
                    classId: data.classId,
                    academicYearId: enrollment.academicYearId,
                    action: 'PROMOTED',
                },
            });
        }
        return {
            id: enrollment.id,
            status: enrollment.status,
            classId: enrollment.classId,
            className: enrollment.class.name,
            academicYearId: enrollment.academicYearId,
            academicYearName: enrollment.academicYear.name,
        };
    }
    async deleteEnrollment(enrollmentId) {
        await this.prisma.classEnrollment.delete({ where: { id: enrollmentId } });
        return { success: true };
    }
    async addClassHistory(studentId, classId, academicYearId, action) {
        const entry = await this.prisma.studentClassHistory.create({
            data: {
                studentId,
                classId,
                academicYearId,
                action: action,
            },
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
    async setActive(id, isActive) {
        await this.prisma.student.update({
            where: { id },
            data: {
                isActive,
            },
        });
        return this.findOne(id);
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], StudentsService);
//# sourceMappingURL=students.service.js.map