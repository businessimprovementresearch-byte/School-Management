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
exports.GalleryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const upload_service_1 = require("../upload/upload.service");
let GalleryService = class GalleryService {
    prisma;
    uploadService;
    constructor(prisma, uploadService) {
        this.prisma = prisma;
        this.uploadService = uploadService;
    }
    async findAllAlbums(classId, eventId) {
        const albums = await this.prisma.galleryAlbum.findMany({
            where: { ...(classId ? { classId } : {}), ...(eventId ? { eventId } : {}) },
            orderBy: { createdAt: 'desc' },
            include: {
                class: true,
                event: true,
                photos: { orderBy: { createdAt: 'asc' }, take: 1, include: { file: true } },
                _count: { select: { photos: true } },
            },
        });
        return Promise.all(albums.map(async (a) => ({
            id: a.id,
            title: a.title,
            description: a.description,
            className: a.class?.name ?? null,
            eventName: a.event?.name ?? null,
            photoCount: a._count.photos,
            coverUrl: a.photos[0] ? await this.uploadService.getFileUrlByFileId(a.photos[0].fileId) : null,
            createdAt: a.createdAt.toISOString(),
        })));
    }
    async createAlbum(dto) {
        const a = await this.prisma.galleryAlbum.create({
            data: {
                title: dto.title,
                description: dto.description ?? null,
                classId: dto.classId ?? null,
                eventId: dto.eventId ?? null,
            },
        });
        return {
            id: a.id,
            title: a.title,
            description: a.description,
            className: null,
            eventName: null,
            photoCount: 0,
            coverUrl: null,
            createdAt: a.createdAt.toISOString(),
        };
    }
    async removeAlbum(id) {
        await this.prisma.galleryAlbum.delete({ where: { id } });
        return { success: true };
    }
    async findAlbum(id) {
        const a = await this.prisma.galleryAlbum.findUnique({
            where: { id },
            include: {
                class: true,
                event: true,
                photos: { orderBy: { createdAt: 'asc' } },
            },
        });
        if (!a)
            throw new common_1.NotFoundException('Album not found');
        const photos = await Promise.all(a.photos.map(async (p) => ({
            id: p.id,
            fileId: p.fileId,
            caption: p.caption,
            url: await this.uploadService.getFileUrlByFileId(p.fileId),
            createdAt: p.createdAt.toISOString(),
        })));
        return {
            id: a.id,
            title: a.title,
            description: a.description,
            className: a.class?.name ?? null,
            eventName: a.event?.name ?? null,
            photos,
        };
    }
    async addPhoto(albumId, dto) {
        const p = await this.prisma.galleryPhoto.create({
            data: { albumId, fileId: dto.fileId, caption: dto.caption ?? null },
        });
        return {
            id: p.id,
            fileId: p.fileId,
            caption: p.caption,
            url: await this.uploadService.getFileUrlByFileId(p.fileId),
            createdAt: p.createdAt.toISOString(),
        };
    }
    async removePhoto(id) {
        await this.prisma.galleryPhoto.delete({ where: { id } });
        return { success: true };
    }
};
exports.GalleryService = GalleryService;
exports.GalleryService = GalleryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], GalleryService);
//# sourceMappingURL=gallery.service.js.map