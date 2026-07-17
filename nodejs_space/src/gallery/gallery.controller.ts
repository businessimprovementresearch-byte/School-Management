import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GalleryService } from './gallery.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateAlbumDto, AddPhotoDto, AlbumListItemDto, AlbumDetailDto, GalleryPhotoDto } from './dto/gallery.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';

@ApiTags('Gallery')
@Controller('api/gallery')
@UseGuards(JwtAuthGuard)
export class GalleryController {
  constructor(private service: GalleryService) {}

  @Get('albums')
  async findAllAlbums(
    @Query('classId') classId?: string,
    @Query('eventId') eventId?: string,
  ): Promise<AlbumListItemDto[]> {
    return this.service.findAllAlbums(classId, eventId);
  }

  @Get('albums/:id')
  async findAlbum(@Param('id') id: string): Promise<AlbumDetailDto> {
    return this.service.findAlbum(id);
  }

  @Post('albums')
  async createAlbum(@Body() dto: CreateAlbumDto): Promise<AlbumListItemDto> {
    return this.service.createAlbum(dto);
  }

  @Delete('albums/:id')
  async removeAlbum(@Param('id') id: string): Promise<SuccessResponseDto> {
    return this.service.removeAlbum(id);
  }

  @Post('albums/:id/photos')
  async addPhoto(@Param('id') id: string, @Body() dto: AddPhotoDto): Promise<GalleryPhotoDto> {
    return this.service.addPhoto(id, dto);
  }

  @Delete('photos/:id')
  async removePhoto(@Param('id') id: string): Promise<SuccessResponseDto> {
    return this.service.removePhoto(id);
  }
}
