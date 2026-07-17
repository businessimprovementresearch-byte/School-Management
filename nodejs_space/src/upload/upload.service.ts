import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as s3 from '../lib/s3';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async getPresignedUploadUrl(fileName: string, contentType: string, isPublic: boolean) {
    return s3.generatePresignedUploadUrl(fileName, contentType, isPublic);
  }

  async completeUpload(
    userId: string,
    cloud_storage_path: string,
    fileName: string,
    contentType: string,
    fileSize?: number,
  ) {
    const file = await this.prisma.file.create({
      data: {
        userId,
        fileName,
        cloud_storage_path,
        isPublic: cloud_storage_path.includes('/public/'),
        contentType,
        fileSize: fileSize ?? null,
      },
    });
    return { id: file.id, cloud_storage_path: file.cloud_storage_path, fileName: file.fileName };
  }

  async getFileUrl(fileId: string, mode: string) {
    const file = await this.prisma.file.findUnique({ where: { id: fileId } });
    if (!file) throw new NotFoundException('File not found');
    if (mode === 'download' && !file.isPublic) {
      const url = await s3.getFileUrl(file.cloud_storage_path, 'application/octet-stream', false);
      return { url };
    }
    const url = await s3.getFileUrl(file.cloud_storage_path, file.contentType, file.isPublic);
    return { url };
  }

  async deleteFile(fileId: string) {
    const file = await this.prisma.file.findUnique({ where: { id: fileId } });
    if (!file) throw new NotFoundException('File not found');
    await s3.deleteFile(file.cloud_storage_path);
    await this.prisma.file.delete({ where: { id: fileId } });
    return { success: true };
  }

  async getFileUrlByFileId(fileId: string | null): Promise<string | null> {
    if (!fileId) return null;
    const file = await this.prisma.file.findUnique({ where: { id: fileId } });
    if (!file) return null;
    return s3.getFileUrl(file.cloud_storage_path, file.contentType, file.isPublic);
  }

  // For internal use (report card PDF upload)
  async uploadBuffer(
    userId: string,
    fileName: string,
    contentType: string,
    buffer: Buffer,
  ) {
    const { uploadUrl, cloud_storage_path } = await s3.generatePresignedUploadUrl(fileName, contentType, false);
    // Upload using fetch
    await fetch(uploadUrl, {
      method: 'PUT',
      body: buffer,
      headers: { 'Content-Type': contentType },
    });
    const file = await this.prisma.file.create({
      data: {
        userId,
        fileName,
        cloud_storage_path,
        isPublic: false,
        contentType,
        fileSize: buffer.length,
      },
    });
    return file;
  }
}
