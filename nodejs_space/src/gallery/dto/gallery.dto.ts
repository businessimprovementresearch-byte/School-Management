import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @IsString() title: string;
  @IsString() @IsOptional() description?: string;
  @IsString() @IsOptional() classId?: string;
  @IsString() @IsOptional() eventId?: string;
}

export class AddPhotoDto {
  @IsString() fileId: string;
  @IsString() @IsOptional() caption?: string;
}

export class AlbumListItemDto {
  @ApiProperty() id: string;
  @ApiProperty() title: string;
  @ApiProperty({ nullable: true }) description: string | null;
  @ApiProperty({ nullable: true }) className: string | null;
  @ApiProperty({ nullable: true }) eventName: string | null;
  @ApiProperty() photoCount: number;
  @ApiProperty({ nullable: true }) coverUrl: string | null;
  @ApiProperty() createdAt: string;
}

export class GalleryPhotoDto {
  @ApiProperty() id: string;
  @ApiProperty() fileId: string;
  @ApiProperty({ nullable: true }) caption: string | null;
  @ApiProperty({ nullable: true }) url: string | null;
  @ApiProperty() createdAt: string;
}

export class AlbumDetailDto {
  @ApiProperty() id: string;
  @ApiProperty() title: string;
  @ApiProperty({ nullable: true }) description: string | null;
  @ApiProperty({ nullable: true }) className: string | null;
  @ApiProperty({ nullable: true }) eventName: string | null;
  @ApiProperty({ type: () => [GalleryPhotoDto] }) photos: GalleryPhotoDto[];
}
