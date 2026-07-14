import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import PDFDocument from 'pdfkit';

@Injectable()
export class ReportCardsService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

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
    const present = attendance.filter((a) => a.status === 'PRESENT' || a.status === 'LATE').length;

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

    // Generate PDF
    const pdfBuffer = await this.generatePdf(student, academicYear, term, { totalSessions, present, attendance }, progress, feedback);

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
    academicYear: any,
    term: { id: string; name: string } | null,
    attendanceData: any,
    progress: any[],
    feedback: any[],
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const chunks: Buffer[] = [];
      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Title
      doc.fontSize(20).font('Helvetica-Bold').text('Pasar Baru Gurmukhi & Kirtan Class', { align: 'center' });
      doc.fontSize(16).text('Report Card', { align: 'center' });
      doc.moveDown();

      // Student Info
      doc.fontSize(12).font('Helvetica');
      doc.text(`Student: ${student.name}`);
      doc.text(`Parent: ${student.parentName}`);
      doc.text(`Academic Year: ${academicYear.name}`);
      if (term) doc.text(`Term: ${term.name}`);
      doc.text(`Date of Birth: ${new Date(student.dob).toLocaleDateString()}`);
      doc.moveDown();

      // Attendance Summary
      doc.fontSize(14).font('Helvetica-Bold').text('Attendance Summary');
      doc.fontSize(12).font('Helvetica');
      doc.text(`Total Sessions: ${attendanceData.totalSessions}`);
      doc.text(`Present: ${attendanceData.present}`);
      doc.text(`Attendance Rate: ${attendanceData.totalSessions > 0 ? Math.round((attendanceData.present / attendanceData.totalSessions) * 100) : 0}%`);
      doc.moveDown();

      // Progress
      if (progress.length > 0) {
        doc.fontSize(14).font('Helvetica-Bold').text('Progress');
        doc.fontSize(12).font('Helvetica');
        const metricMap = new Map<string, { name: string; className: string; values: number[] }>();
        for (const p of progress) {
          const key = p.progressMetricId;
          if (!metricMap.has(key)) {
            metricMap.set(key, {
              name: p.progressMetric.name,
              className: p.progressMetric.class.name,
              values: [],
            });
          }
          metricMap.get(key)!.values.push(p.value);
        }
        for (const [, data] of metricMap) {
          const avg = data.values.reduce((a, b) => a + b, 0) / data.values.length;
          doc.text(`${data.className} - ${data.name}: Average ${avg.toFixed(1)}`);
        }
        doc.moveDown();
      }

      // Feedback / Teacher Comments
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
}
