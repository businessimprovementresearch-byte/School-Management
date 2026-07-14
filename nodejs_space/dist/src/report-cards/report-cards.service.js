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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportCardsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const upload_service_1 = require("../upload/upload.service");
const pdfkit_1 = __importDefault(require("pdfkit"));
let ReportCardsService = class ReportCardsService {
    prisma;
    uploadService;
    constructor(prisma, uploadService) {
        this.prisma = prisma;
        this.uploadService = uploadService;
    }
    async generate(userId, studentId, academicYearId, termId) {
        const student = await this.prisma.student.findUnique({ where: { id: studentId } });
        if (!student)
            throw new common_1.NotFoundException('Student not found');
        const academicYear = await this.prisma.academicYear.findUnique({ where: { id: academicYearId } });
        if (!academicYear)
            throw new common_1.NotFoundException('Academic year not found');
        let term = null;
        if (termId) {
            const t = await this.prisma.term.findUnique({ where: { id: termId } });
            if (t)
                term = { id: t.id, name: t.name };
        }
        const sessionWhere = { academicYearId };
        if (termId)
            sessionWhere.termId = termId;
        const attendance = await this.prisma.studentAttendance.findMany({
            where: {
                studentId,
                classSession: sessionWhere,
            },
            include: { classSession: { include: { class: true } } },
        });
        const totalSessions = attendance.length;
        const present = attendance.filter((a) => a.status === 'PRESENT' || a.status === 'LATE').length;
        const progress = await this.prisma.studentProgress.findMany({
            where: {
                studentId,
                classSession: sessionWhere,
            },
            include: {
                progressMetric: { include: { class: true } },
                classSession: true,
            },
            orderBy: { classSession: { date: 'asc' } },
        });
        const feedback = await this.prisma.feedback.findMany({
            where: {
                studentId,
                classSession: sessionWhere,
            },
            include: { teacher: true, classSession: { include: { class: true } } },
            orderBy: { createdAt: 'desc' },
            take: 10,
        });
        const pdfBuffer = await this.generatePdf(student, academicYear, term, { totalSessions, present, attendance }, progress, feedback);
        const fileName = `report-card-${student.name.replace(/\s+/g, '-')}-${academicYear.name.replace(/\s+/g, '-')}.pdf`;
        const file = await this.uploadService.uploadBuffer(userId, fileName, 'application/pdf', pdfBuffer);
        const reportCard = await this.prisma.reportCard.create({
            data: {
                studentId,
                academicYearId,
                termId: termId ?? null,
                pdfFileId: file.id,
            },
        });
        const pdfUrl = await this.uploadService.getFileUrlByFileId(file.id);
        return {
            id: reportCard.id,
            studentId,
            studentName: student.name,
            academicYearName: academicYear.name,
            termName: term?.name ?? null,
            pdfFileId: file.id,
            pdfUrl: pdfUrl ?? '',
            generatedAt: reportCard.generatedAt.toISOString(),
        };
    }
    async generatePdf(student, academicYear, term, attendanceData, progress, feedback) {
        return new Promise((resolve, reject) => {
            const doc = new pdfkit_1.default({ margin: 50 });
            const chunks = [];
            doc.on('data', (chunk) => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            doc.on('error', reject);
            doc.fontSize(20).font('Helvetica-Bold').text('Pasar Baru Gurmukhi & Kirtan Class', { align: 'center' });
            doc.fontSize(16).text('Report Card', { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).font('Helvetica');
            doc.text(`Student: ${student.name}`);
            doc.text(`Parent: ${student.parentName}`);
            doc.text(`Academic Year: ${academicYear.name}`);
            if (term)
                doc.text(`Term: ${term.name}`);
            doc.text(`Date of Birth: ${new Date(student.dob).toLocaleDateString()}`);
            doc.moveDown();
            doc.fontSize(14).font('Helvetica-Bold').text('Attendance Summary');
            doc.fontSize(12).font('Helvetica');
            doc.text(`Total Sessions: ${attendanceData.totalSessions}`);
            doc.text(`Present: ${attendanceData.present}`);
            doc.text(`Attendance Rate: ${attendanceData.totalSessions > 0 ? Math.round((attendanceData.present / attendanceData.totalSessions) * 100) : 0}%`);
            doc.moveDown();
            if (progress.length > 0) {
                doc.fontSize(14).font('Helvetica-Bold').text('Progress');
                doc.fontSize(12).font('Helvetica');
                const metricMap = new Map();
                for (const p of progress) {
                    const key = p.progressMetricId;
                    if (!metricMap.has(key)) {
                        metricMap.set(key, {
                            name: p.progressMetric.name,
                            className: p.progressMetric.class.name,
                            values: [],
                        });
                    }
                    metricMap.get(key).values.push(p.value);
                }
                for (const [, data] of metricMap) {
                    const avg = data.values.reduce((a, b) => a + b, 0) / data.values.length;
                    doc.text(`${data.className} - ${data.name}: Average ${avg.toFixed(1)}`);
                }
                doc.moveDown();
            }
            if (feedback.length > 0) {
                doc.fontSize(14).font('Helvetica-Bold').text('Teacher Comments');
                doc.fontSize(12).font('Helvetica');
                for (const f of feedback.slice(0, 5)) {
                    doc.text(`${f.classSession.class.name} - ${f.teacher.name}: "${f.content}"`);
                }
                doc.moveDown();
            }
            doc.fontSize(10).text(`Generated on ${new Date().toLocaleDateString()}`, { align: 'right' });
            doc.end();
        });
    }
    async findAll(studentId) {
        const reportCards = await this.prisma.reportCard.findMany({
            where: { studentId },
            include: { student: true, academicYear: true, term: true, pdfFile: true },
            orderBy: { generatedAt: 'desc' },
        });
        return Promise.all(reportCards.map(async (rc) => ({
            id: rc.id,
            studentId: rc.studentId,
            studentName: rc.student.name,
            academicYearName: rc.academicYear.name,
            termName: rc.term?.name ?? null,
            pdfFileId: rc.pdfFileId,
            pdfUrl: (await this.uploadService.getFileUrlByFileId(rc.pdfFileId)) ?? '',
            generatedAt: rc.generatedAt.toISOString(),
        })));
    }
    async getDownloadUrl(id) {
        const reportCard = await this.prisma.reportCard.findUnique({
            where: { id },
            include: { pdfFile: true },
        });
        if (!reportCard)
            throw new common_1.NotFoundException('Report card not found');
        const result = await this.uploadService.getFileUrl(reportCard.pdfFileId, 'download');
        return result;
    }
};
exports.ReportCardsService = ReportCardsService;
exports.ReportCardsService = ReportCardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], ReportCardsService);
//# sourceMappingURL=report-cards.service.js.map