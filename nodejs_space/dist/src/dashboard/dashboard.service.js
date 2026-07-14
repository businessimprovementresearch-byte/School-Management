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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboard(userId, role) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        let teacherClassIds;
        if (role === 'TEACHER') {
            const teacher = await this.prisma.teacher.findUnique({
                where: { userId },
                include: { assignments: true },
            });
            teacherClassIds = teacher?.assignments?.map((a) => a.classId) ?? [];
        }
        const classFilter = teacherClassIds ? { id: { in: teacherClassIds } } : {};
        const [totalStudents, totalTeachers, activeClasses] = await Promise.all([
            role === 'ADMIN'
                ? this.prisma.student.count()
                : this.prisma.student.count({
                    where: {
                        enrollments: {
                            some: { classId: { in: teacherClassIds ?? [] }, status: 'ACTIVE' },
                        },
                    },
                }),
            role === 'ADMIN'
                ? this.prisma.teacher.count()
                : (teacherClassIds?.length ?? 0),
            this.prisma.class.count({ where: classFilter }),
        ]);
        const todaySessions = await this.prisma.classSession.findMany({
            where: {
                date: { gte: today, lt: tomorrow },
                ...(teacherClassIds ? { classId: { in: teacherClassIds } } : {}),
            },
            include: {
                class: true,
                studentAttendance: true,
            },
        });
        const pendingAttendanceSessions = todaySessions
            .filter((s) => s.studentAttendance.length === 0)
            .map((s) => ({
            id: s.id,
            classId: s.classId,
            className: s.class.name,
            date: s.date.toISOString(),
        }));
        const recentFeedback = await this.prisma.feedback.findMany({
            where: teacherClassIds
                ? { classSession: { classId: { in: teacherClassIds } } }
                : {},
            include: {
                teacher: true,
                student: true,
                classSession: { include: { class: true } },
            },
            orderBy: { createdAt: 'desc' },
            take: 5,
        });
        const activeAcademicYear = await this.prisma.academicYear.findFirst({
            where: { isActive: true },
        });
        return {
            totalStudents,
            totalTeachers,
            activeClasses,
            todaySessions: todaySessions.map((s) => ({
                id: s.id,
                classId: s.classId,
                className: s.class.name,
                date: s.date.toISOString(),
                attendanceSubmitted: s.studentAttendance.length > 0,
            })),
            pendingAttendanceSessions,
            recentFeedback: recentFeedback.map((f) => ({
                id: f.id,
                classSessionId: f.classSessionId,
                teacherId: f.teacherId,
                teacherName: f.teacher.name,
                studentId: f.studentId,
                studentName: f.student?.name ?? null,
                content: f.content,
                type: f.type,
                createdAt: f.createdAt.toISOString(),
            })),
            activeAcademicYear: activeAcademicYear
                ? { id: activeAcademicYear.id, name: activeAcademicYear.name }
                : null,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map