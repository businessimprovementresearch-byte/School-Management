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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AttendanceService = class AttendanceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async bulkSave(sessionId, studentAttendance, teacherAttendance) {
        let savedCount = 0;
        for (const sa of studentAttendance) {
            await this.prisma.studentAttendance.upsert({
                where: {
                    studentId_classSessionId: {
                        studentId: sa.studentId,
                        classSessionId: sessionId,
                    },
                },
                update: { status: sa.status },
                create: {
                    studentId: sa.studentId,
                    classSessionId: sessionId,
                    status: sa.status,
                },
            });
            savedCount++;
        }
        if (teacherAttendance) {
            for (const ta of teacherAttendance) {
                await this.prisma.teacherAttendance.upsert({
                    where: {
                        teacherId_classSessionId: {
                            teacherId: ta.teacherId,
                            classSessionId: sessionId,
                        },
                    },
                    update: { status: ta.status },
                    create: {
                        teacherId: ta.teacherId,
                        classSessionId: sessionId,
                        status: ta.status,
                    },
                });
                savedCount++;
            }
        }
        return { success: true, savedCount };
    }
    async getOverview(classId, month, year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);
        const sessions = await this.prisma.classSession.findMany({
            where: {
                classId,
                date: { gte: startDate, lte: endDate },
            },
            include: {
                studentAttendance: { include: { student: true } },
            },
            orderBy: { date: 'asc' },
        });
        const sessionList = sessions.map((s) => ({
            id: s.id,
            date: s.date.toISOString(),
            attendanceSubmitted: s.studentAttendance.length > 0,
        }));
        const totalSessions = sessions.length;
        let totalPresent = 0;
        let totalRecords = 0;
        const studentMap = new Map();
        for (const session of sessions) {
            for (const att of session.studentAttendance) {
                if (!studentMap.has(att.studentId)) {
                    studentMap.set(att.studentId, {
                        name: att.student.name,
                        present: 0, absent: 0, late: 0, excused: 0, total: 0,
                    });
                }
                const entry = studentMap.get(att.studentId);
                entry.total++;
                totalRecords++;
                if (att.status === 'PRESENT') {
                    entry.present++;
                    totalPresent++;
                }
                else if (att.status === 'ABSENT')
                    entry.absent++;
                else if (att.status === 'LATE') {
                    entry.late++;
                    totalPresent++;
                }
                else if (att.status === 'EXCUSED')
                    entry.excused++;
            }
        }
        return {
            sessions: sessionList,
            classSummary: {
                totalSessions,
                averageAttendance: totalRecords > 0 ? Math.round((totalPresent / totalRecords) * 100) : 0,
            },
            studentBreakdown: Array.from(studentMap.entries()).map(([studentId, data]) => ({
                studentId,
                studentName: data.name,
                present: data.present,
                absent: data.absent,
                late: data.late,
                excused: data.excused,
                total: data.total,
                percentage: data.total > 0 ? Math.round(((data.present + data.late) / data.total) * 100) : 0,
            })),
        };
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map