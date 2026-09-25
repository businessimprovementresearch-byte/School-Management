import { GalleryService } from './gallery.service';
import { CreateAlbumDto, AddPhotoDto, AlbumListItemDto, AlbumDetailDto, GalleryPhotoDto } from './dto/gallery.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';
export declare class GalleryController {
    private service;
    constructor(service: GalleryService);
    findAllAlbums(classId?: string, eventId?: string): Promise<AlbumListItemDto[]>;
    findAlbum(id: string): Promise<AlbumDetailDto>;
    createAlbum(dto: CreateAlbumDto): Promise<AlbumListItemDto>;
    removeAlbum(id: string): Promise<SuccessResponseDto>;
    addPhoto(id: string, dto: AddPhotoDto): Promise<GalleryPhotoDto>;
    removePhoto(id: string): Promise<SuccessResponseDto>;
}
