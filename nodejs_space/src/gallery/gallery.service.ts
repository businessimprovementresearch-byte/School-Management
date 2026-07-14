import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { CreateAlbumDto, AddPhotoDto } from './dto/gallery.dto';

@Injectable()
export class GalleryService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async findAllAlbums(classId?: string, eventId?: string) {
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
    return Promise.all(
      albums.map(async (a) => ({
        id: a.id,
        title: a.title,
        description: a.description,
        className: a.class?.name ?? null,
        eventName: a.event?.name ?? null,
        photoCount: a._count.photos,
        coverUrl: a.photos[0] ? await this.uploadService.getFileUrlByFileId(a.photos[0].fileId) : null,
        createdAt: a.createdAt.toISOString(),
      })),
    );
  }

  async createAlbum(dto: CreateAlbumDto) {
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

  async removeAlbum(id: string) {
    await this.prisma.galleryAlbum.delete({ where: { id } });
    return { success: true };
  }

  async findAlbum(id: string) {
    const a = await this.prisma.galleryAlbum.findUnique({
      where: { id },
      include: {
        class: true,
        event: true,
        photos: { orderBy: { createdAt: 'asc' } },
      },
    });
    if (!a) throw new NotFoundException('Album not found');
    const photos = await Promise.all(
      a.photos.map(async (p) => ({
        id: p.id,
        fileId: p.fileId,
        caption: p.caption,
        url: await this.uploadService.getFileUrlByFileId(p.fileId),
        createdAt: p.createdAt.toISOString(),
      })),
    );
    return {
      id: a.id,
      title: a.title,
      description: a.description,
      className: a.class?.name ?? null,
      eventName: a.event?.name ?? null,
      photos,
    };
  }

  async addPhoto(albumId: string, dto: AddPhotoDto) {
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

  async removePhoto(id: string) {
    await this.prisma.galleryPhoto.delete({ where: { id } });
    return { success: true };
  }
}
