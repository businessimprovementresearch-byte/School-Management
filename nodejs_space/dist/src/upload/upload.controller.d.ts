import { UploadService } from './upload.service';
import { PresignedUploadDto } from './dto/presigned-upload.dto';
import { CompleteUploadDto } from './dto/complete-upload.dto';
import { PresignedUploadResponseDto } from './dto/presigned-upload-response.dto';
import { CompleteUploadResponseDto } from './dto/complete-upload-response.dto';
import { FileUrlResponseDto } from './dto/file-url-response.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';
import type { Request } from 'express';
export declare class UploadController {
    private uploadService;
    constructor(uploadService: UploadService);
    getPresignedUrl(dto: PresignedUploadDto): Promise<PresignedUploadResponseDto>;
    completeUpload(req: Request, dto: CompleteUploadDto): Promise<CompleteUploadResponseDto>;
    getFileUrl(id: string, mode: string): Promise<FileUrlResponseDto>;
    deleteFile(id: string): Promise<SuccessResponseDto>;
}
