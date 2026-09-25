export declare class CreateAlbumDto {
    title: string;
    description?: string;
    classId?: string;
    eventId?: string;
}
export declare class AddPhotoDto {
    fileId: string;
    caption?: string;
}
export declare class AlbumListItemDto {
    id: string;
    title: string;
    description: string | null;
    className: string | null;
    eventName: string | null;
    photoCount: number;
    coverUrl: string | null;
    createdAt: string;
}
export declare class GalleryPhotoDto {
    id: string;
    fileId: string;
    caption: string | null;
    url: string | null;
    createdAt: string;
}
export declare class AlbumDetailDto {
    id: string;
    title: string;
    description: string | null;
    className: string | null;
    eventName: string | null;
    photos: GalleryPhotoDto[];
}
