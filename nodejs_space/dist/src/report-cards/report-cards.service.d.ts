import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
export declare class ReportCardsService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    generate(userId: string, studentId: string, academicYearId: string, termId?: string | null): Promise<{
        id: string;
        studentId: string;
        studentName: string;
        academicYearName: string;
        termName: string | null;
        pdfFileId: string;
        pdfUrl: string;
        generatedAt: string;
    }>;
    private generatePdf;
    findAll(studentId: string): Promise<{
        id: string;
        studentId: string;
        studentName: string;
        academicYearName: string;
        termName: string | null;
        pdfFileId: string;
        pdfUrl: string;
        generatedAt: string;
    }[]>;
    getDownloadUrl(id: string): Promise<{
        url: string;
    }>;
}
