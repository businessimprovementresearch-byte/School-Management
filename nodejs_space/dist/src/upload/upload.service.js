"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const s3 = __importStar(require("../lib/s3"));
let UploadService = class UploadService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPresignedUploadUrl(fileName, contentType, isPublic) {
        return s3.generatePresignedUploadUrl(fileName, contentType, isPublic);
    }
    async completeUpload(userId, cloud_storage_path, fileName, contentType, fileSize) {
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
    async getFileUrl(fileId, mode) {
        const file = await this.prisma.file.findUnique({ where: { id: fileId } });
        if (!file)
            throw new common_1.NotFoundException('File not found');
        if (mode === 'download' && !file.isPublic) {
            const url = await s3.getFileUrl(file.cloud_storage_path, 'application/octet-stream', false);
            return { url };
        }
        const url = await s3.getFileUrl(file.cloud_storage_path, file.contentType, file.isPublic);
        return { url };
    }
    async deleteFile(fileId) {
        const file = await this.prisma.file.findUnique({ where: { id: fileId } });
        if (!file)
            throw new common_1.NotFoundException('File not found');
        await s3.deleteFile(file.cloud_storage_path);
        await this.prisma.file.delete({ where: { id: fileId } });
        return { success: true };
    }
    async getFileUrlByFileId(fileId) {
        if (!fileId)
            return null;
        const file = await this.prisma.file.findUnique({ where: { id: fileId } });
        if (!file)
            return null;
        return s3.getFileUrl(file.cloud_storage_path, file.contentType, file.isPublic);
    }
    async uploadBuffer(userId, fileName, contentType, buffer) {
        const { uploadUrl, cloud_storage_path } = await s3.generatePresignedUploadUrl(fileName, contentType, false);
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
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UploadService);
//# sourceMappingURL=upload.service.js.map