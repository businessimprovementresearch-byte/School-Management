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
        const countable = attendance.filter((a) => a.status === 'PRESENT' || a.status === 'ABSENT' || a.status === 'UNSURE').length;
        const present = attendance.filter((a) => a.status === 'PRESENT').length;
        const percentage = countable > 0 ? Math.round((present / countable) * 100) : 0;
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
        const classIds = Array.from(new Set(attendance.map((a) => a.classSession.classId)));
        const classes = classIds.length
            ? await this.prisma.class.findMany({ where: { id: { in: classIds } } })
            : [];
        const className = classes.map((c) => c.name).join(', ') || '-';
        const teacherAssignment = classIds.length
            ? await this.prisma.teacherAssignment.findFirst({
                where: { classId: { in: classIds }, academicYearId },
                include: { teacher: true },
            })
            : null;
        const facilitatorName = teacherAssignment?.teacher?.name ?? feedback[0]?.teacher?.name ?? '';
        const pdfBuffer = await this.generatePdf(student, className, { totalSessions, present, percentage }, progress, feedback, facilitatorName);
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
    async generatePdf(student, className, attendanceData, progress, feedback, facilitatorName) {
        return new Promise((resolve, reject) => {
            const doc = new pdfkit_1.default({ margin: 50 });
            const chunks = [];
            doc.on('data', (chunk) => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            doc.on('error', reject);
            const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
            const drawTable = (headers, rows, colWidths) => {
                const startX = doc.page.margins.left;
                const rowHeight = 22;
                let y = doc.y;
                const drawRow = (cells, isHeader) => {
                    let x = startX;
                    doc.font(isHeader ? 'Helvetica-Bold' : 'Helvetica').fontSize(10);
                    for (let i = 0; i < cells.length; i++) {
                        doc.rect(x, y, colWidths[i], rowHeight).stroke();
                        doc.text(cells[i], x + 4, y + 6, { width: colWidths[i] - 8, align: 'left' });
                        x += colWidths[i];
                    }
                    y += rowHeight;
                };
                drawRow(headers, true);
                for (const row of rows) {
                    if (y + rowHeight > doc.page.height - doc.page.margins.bottom) {
                        doc.addPage();
                        y = doc.page.margins.top;
                    }
                    drawRow(row, false);
                }
                doc.x = startX;
                doc.y = y + 10;
            };
            doc.fontSize(18).font('Helvetica-Bold').text('Student Progress Report', { align: 'center' });
            doc.fontSize(13).font('Helvetica').text('Gurmukhi Class Pasar Baru', { align: 'center' });
            doc.moveDown(1.5);
            doc.fontSize(12).font('Helvetica-Bold').text('Student Information');
            doc.moveDown(0.3);
            doc.font('Helvetica').fontSize(11);
            doc.text(`Name          : ${student.name}`);
            doc.text(`Class         : ${className}`);
            doc.moveDown(1);
            const examMetrics = new Map();
            const additionalMetrics = new Map();
            for (const p of progress) {
                const target = p.progressMetric.type === 'SCORE' ? examMetrics : additionalMetrics;
                const key = p.progressMetricId;
                if (!target.has(key))
                    target.set(key, { name: p.progressMetric.name, values: [], notes: [] });
                const entry = target.get(key);
                entry.values.push(p.value);
                if (p.notes)
                    entry.notes.push(p.notes);
            }
            const avg = (values) => values.reduce((a, b) => a + b, 0) / values.length;
            const TOTAL_MARKS = 100;
            doc.font('Helvetica-Bold').fontSize(12).text('Exam Results');
            doc.moveDown(0.3);
            const examRows = Array.from(examMetrics.values()).map((m) => {
                const marks = avg(m.values);
                return [m.name, marks.toFixed(1), `${TOTAL_MARKS}`, `${Math.round((marks / TOTAL_MARKS) * 100)}%`];
            });
            drawTable(['Exam Component', 'Marks Obtained', 'Total Marks', 'Score'], examRows.length ? examRows : [['-', '-', '-', '-']], [pageWidth * 0.4, pageWidth * 0.2, pageWidth * 0.2, pageWidth * 0.2]);
            const allScorePercentages = [
                ...Array.from(examMetrics.values()).map((m) => (avg(m.values) / TOTAL_MARKS) * 100),
                ...Array.from(additionalMetrics.values()).map((m) => (avg(m.values) / TOTAL_MARKS) * 100),
                attendanceData.percentage,
            ];
            const finalScore = allScorePercentages.length
                ? Math.round(allScorePercentages.reduce((a, b) => a + b, 0) / allScorePercentages.length)
                : 0;
            doc.font('Helvetica-Bold').fontSize(12).text('Additional Scores');
            doc.moveDown(0.3);
            const additionalRows = [
                ['# Class Attended', `${attendanceData.present} / ${attendanceData.totalSessions}`, '-', '-'],
                ['Attendance Score', `${attendanceData.percentage}%`, '-', '-'],
                ...Array.from(additionalMetrics.values()).map((m) => {
                    const marks = avg(m.values);
                    return [m.name, marks.toFixed(1), `${TOTAL_MARKS}`, m.notes.join('; ') || '-'];
                }),
                ['Final Score', `${finalScore}%`, '-', '-'],
            ];
            drawTable(['Additional Component', 'Score', 'Total Marks', 'Remarks'], additionalRows, [pageWidth * 0.3, pageWidth * 0.2, pageWidth * 0.2, pageWidth * 0.3]);
            doc.moveDown(1);
            doc.font('Helvetica-Bold').fontSize(12).text('Comments');
            doc.moveDown(0.3);
            const boxX = doc.page.margins.left;
            const boxY = doc.y;
            const boxHeight = 150;
            doc.rect(boxX, boxY, pageWidth, boxHeight).stroke();
            doc.font('Helvetica').fontSize(11);
            const commentText = feedback.length > 0
                ? feedback.slice(0, 5).map((f) => `- ${f.content}`).join('\n')
                : '';
            doc.text(commentText, boxX + 8, boxY + 8, { width: pageWidth - 16, height: boxHeight - 16 });
            doc.x = boxX;
            doc.y = boxY + boxHeight + 12;
            doc.font('Helvetica-Bold').fontSize(12).text(`Facilitator's Name    : `, { continued: true });
            doc.font('Helvetica').text(facilitatorName || '-');
            doc.moveDown(1);
            doc.fontSize(9).font('Helvetica').text(`Generated on ${new Date().toLocaleDateString()}`, { align: 'right' });
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
    async remove(id) {
        const reportCard = await this.prisma.reportCard.findUnique({ where: { id } });
        if (!reportCard)
            throw new common_1.NotFoundException('Report card not found');
        await this.uploadService.deleteFile(reportCard.pdfFileId);
        return { id };
    }
};
exports.ReportCardsService = ReportCardsService;
exports.ReportCardsService = ReportCardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], ReportCardsService);
//# sourceMappingURL=report-cards.service.js.map