import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import PDFDocument from 'pdfkit';

@Injectable()
export class ReportCardsService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) { }

  async generate(userId: string, studentId: string, academicYearId: string, termId?: string | null) {
    const student = await this.prisma.student.findUnique({ where: { id: studentId } });
    if (!student) throw new NotFoundException('Student not found');

    const academicYear = await this.prisma.academicYear.findUnique({ where: { id: academicYearId } });
    if (!academicYear) throw new NotFoundException('Academic year not found');

    let term: { id: string; name: string } | null = null;
    if (termId) {
      const t = await this.prisma.term.findUnique({ where: { id: termId } });
      if (t) term = { id: t.id, name: t.name };
    }

    // Get attendance data
    const sessionWhere: any = { academicYearId };
    if (termId) sessionWhere.termId = termId;

    const attendance = await this.prisma.studentAttendance.findMany({
      where: {
        studentId,
        classSession: sessionWhere,
      },
      include: { classSession: { include: { class: true } } },
    });

    const totalSessions = attendance.length;
    const countable = attendance.filter((a) =>
      a.status === 'PRESENT' || a.status === 'ABSENT' || a.status === 'UNSURE'
    ).length;
    const present = attendance.filter((a) => a.status === 'PRESENT').length;
    const percentage = countable > 0 ? Math.round((present / countable) * 100) : 0;

    // Get progress data
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

    // Get feedback
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

    // Upload to S3
    const fileName = `report-card-${student.name.replace(/\s+/g, '-')}-${academicYear.name.replace(/\s+/g, '-')}.pdf`;
    const file = await this.uploadService.uploadBuffer(userId, fileName, 'application/pdf', pdfBuffer);

    // Create report card record
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

  private async generatePdf(
    student: any,
    className: string,
    attendanceData: { totalSessions: number; present: number; percentage: number },
    progress: any[],
    feedback: any[],
    facilitatorName: string,
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const chunks: Uint8Array[] = [];
      doc.on('data', (chunk: Uint8Array) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks) as Buffer));
      doc.on('error', reject);

      const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

      // Simple table drawing helper (borders + wrapped text per cell)
      const drawTable = (
        headers: string[],
        rows: string[][],
        colWidths: number[],
      ) => {
        const startX = doc.page.margins.left;
        const rowHeight = 22;
        let y = doc.y;

        const drawRow = (cells: string[], isHeader: boolean) => {
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
        doc.y = y + 10;
      };

      // Title
      doc.fontSize(18).font('Helvetica-Bold').text('Student Progress Report', { align: 'center' });
      doc.fontSize(13).font('Helvetica').text('Gurmukhi Class Pasar Baru', { align: 'center' });
      doc.moveDown(1.5);

      // Student Information
      doc.fontSize(12).font('Helvetica-Bold').text('Student Information');
      doc.moveDown(0.3);
      doc.font('Helvetica').fontSize(11);
      doc.text(`Name: ${student.name}`);
      doc.text(`Class: ${className}`);
      doc.moveDown(1);

      // Split progress into exam (SCORE) vs additional (LEVEL/RATING) metrics
      const examMetrics = new Map<string, { name: string; values: number[]; notes: string[] }>();
      const additionalMetrics = new Map<string, { name: string; values: number[]; notes: string[] }>();
      for (const p of progress) {
        const target = p.progressMetric.type === 'SCORE' ? examMetrics : additionalMetrics;
        const key = p.progressMetricId;
        if (!target.has(key)) target.set(key, { name: p.progressMetric.name, values: [], notes: [] });
        const entry = target.get(key)!;
        entry.values.push(p.value);
        if (p.notes) entry.notes.push(p.notes);
      }
      const avg = (values: number[]) => values.reduce((a, b) => a + b, 0) / values.length;
      const TOTAL_MARKS = 100; // Metrics are recorded as a value out of 100

      // Exam Results
      doc.font('Helvetica-Bold').fontSize(12).text('Exam Results');
      doc.moveDown(0.3);
      const examRows = Array.from(examMetrics.values()).map((m) => {
        const marks = avg(m.values);
        return [m.name, marks.toFixed(1), `${TOTAL_MARKS}`, `${Math.round((marks / TOTAL_MARKS) * 100)}%`];
      });
      drawTable(
        ['Exam Component', 'Marks Obtained', 'Total Marks', 'Score'],
        examRows.length ? examRows : [['-', '-', '-', '-']],
        [pageWidth * 0.4, pageWidth * 0.2, pageWidth * 0.2, pageWidth * 0.2],
      );

      // Additional Scores
      doc.font('Helvetica-Bold').fontSize(12).text('Additional Scores');
      doc.moveDown(0.3);
      const additionalRows = Array.from(additionalMetrics.values()).map((m) => {
        const marks = avg(m.values);
        return [m.name, marks.toFixed(1), `${TOTAL_MARKS}`, m.notes.join('; ') || '-'];
      });
      drawTable(
        ['Additional Component', 'Score', 'Total Marks', 'Remarks'],
        additionalRows.length ? additionalRows : [['-', '-', '-', '-']],
        [pageWidth * 0.3, pageWidth * 0.2, pageWidth * 0.2, pageWidth * 0.3],
      );

      // Attendance & Final Score
      doc.font('Helvetica-Bold').fontSize(12).text(`# Class Attended: `, { continued: true });
      doc.font('Helvetica').text(`${attendanceData.present} / ${attendanceData.totalSessions}`);
      doc.font('Helvetica-Bold').text(`Attendance Score: `, { continued: true });
      doc.font('Helvetica').text(`${attendanceData.percentage}%`);

      const allScorePercentages = [
        ...Array.from(examMetrics.values()).map((m) => (avg(m.values) / TOTAL_MARKS) * 100),
        ...Array.from(additionalMetrics.values()).map((m) => (avg(m.values) / TOTAL_MARKS) * 100),
        attendanceData.percentage,
      ];
      const finalScore = allScorePercentages.length
        ? Math.round(allScorePercentages.reduce((a, b) => a + b, 0) / allScorePercentages.length)
        : 0;
      doc.font('Helvetica-Bold').text(`Final Score: `, { continued: true });
      doc.font('Helvetica').text(`${finalScore}%`);
      doc.moveDown(1);

      // Comments (from teacher feedback)
      doc.font('Helvetica-Bold').fontSize(12).text('Comments');
      doc.moveDown(0.3);
      doc.font('Helvetica').fontSize(11);
      if (feedback.length > 0) {
        for (const f of feedback.slice(0, 5)) {
          doc.text(`- ${f.content}`);
        }
      } else {
        doc.text('-');
      }
      doc.moveDown(1);

      // Facilitator's Name
      doc.font('Helvetica-Bold').fontSize(12).text(`Facilitator's Name: `, { continued: true });
      doc.font('Helvetica').text(facilitatorName || '-');

      doc.moveDown(1);
      doc.fontSize(9).font('Helvetica').text(`Generated on ${new Date().toLocaleDateString()}`, { align: 'right' });
      doc.end();
    });
  }

  async findAll(studentId: string) {
    const reportCards = await this.prisma.reportCard.findMany({
      where: { studentId },
      include: { student: true, academicYear: true, term: true, pdfFile: true },
      orderBy: { generatedAt: 'desc' },
    });

    return Promise.all(
      reportCards.map(async (rc) => ({
        id: rc.id,
        studentId: rc.studentId,
        studentName: rc.student.name,
        academicYearName: rc.academicYear.name,
        termName: rc.term?.name ?? null,
        pdfFileId: rc.pdfFileId,
        pdfUrl: (await this.uploadService.getFileUrlByFileId(rc.pdfFileId)) ?? '',
        generatedAt: rc.generatedAt.toISOString(),
      })),
    );
  }

  async getDownloadUrl(id: string) {
    const reportCard = await this.prisma.reportCard.findUnique({
      where: { id },
      include: { pdfFile: true },
    });
    if (!reportCard) throw new NotFoundException('Report card not found');
    const result = await this.uploadService.getFileUrl(reportCard.pdfFileId, 'download');
    return result;
  }

  async remove(id: string) {
    const reportCard = await this.prisma.reportCard.findUnique({ where: { id } });
    if (!reportCard) throw new NotFoundException('Report card not found');

    // Deleting the underlying PDF file cascades to delete the report card record too
    await this.uploadService.deleteFile(reportCard.pdfFileId);

    return { id };
  }
}
