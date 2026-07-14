import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { CreateAlbumDto, AddPhotoDto } from './dto/gallery.dto';
export declare class GalleryService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    findAllAlbums(classId?: string, eventId?: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        className: string | null;
        eventName: string | null;
        photoCount: number;
        coverUrl: string | null;
        createdAt: string;
    }[]>;
    createAlbum(dto: CreateAlbumDto): Promise<{
        id: string;
        title: string;
        description: string | null;
        className: null;
        eventName: null;
        photoCount: number;
        coverUrl: null;
        createdAt: string;
    }>;
    removeAlbum(id: string): Promise<{
        success: boolean;
    }>;
    findAlbum(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        className: string | null;
        eventName: string | null;
        photos: {
            id: string;
            fileId: string;
            caption: string | null;
            url: string | null;
            createdAt: string;
        }[];
    }>;
    addPhoto(albumId: string, dto: AddPhotoDto): Promise<{
        id: string;
        fileId: string;
        caption: string | null;
        url: string | null;
        createdAt: string;
    }>;
    removePhoto(id: string): Promise<{
        success: boolean;
    }>;
}
