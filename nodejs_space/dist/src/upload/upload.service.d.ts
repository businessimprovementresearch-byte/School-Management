import { PrismaService } from '../prisma/prisma.service';
export declare class UploadService {
    private prisma;
    constructor(prisma: PrismaService);
    getPresignedUploadUrl(fileName: string, contentType: string, isPublic: boolean): Promise<{
        uploadUrl: string;
        cloud_storage_path: string;
    }>;
    completeUpload(userId: string, cloud_storage_path: string, fileName: string, contentType: string, fileSize?: number): Promise<{
        id: string;
        cloud_storage_path: string;
        fileName: string;
    }>;
    getFileUrl(fileId: string, mode: string): Promise<{
        url: string;
    }>;
    deleteFile(fileId: string): Promise<{
        success: boolean;
    }>;
    getFileUrlByFileId(fileId: string | null): Promise<string | null>;
    uploadBuffer(userId: string, fileName: string, contentType: string, buffer: Buffer): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        cloud_storage_path: string;
        fileName: string;
        isPublic: boolean;
        contentType: string;
        fileSize: number | null;
    }>;
}
