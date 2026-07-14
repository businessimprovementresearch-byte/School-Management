import { Controller, Post, Get, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PresignedUploadDto } from './dto/presigned-upload.dto';
import { CompleteUploadDto } from './dto/complete-upload.dto';
import { PresignedUploadResponseDto } from './dto/presigned-upload-response.dto';
import { CompleteUploadResponseDto } from './dto/complete-upload-response.dto';
import { FileUrlResponseDto } from './dto/file-url-response.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';
import type { Request } from 'express';

@ApiTags('Upload')
@Controller('api')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('upload/presigned')
  async getPresignedUrl(@Body() dto: PresignedUploadDto): Promise<PresignedUploadResponseDto> {
    return this.uploadService.getPresignedUploadUrl(dto.fileName, dto.contentType, dto.isPublic ?? false);
  }

  @Post('upload/complete')
  async completeUpload(@Req() req: Request, @Body() dto: CompleteUploadDto): Promise<CompleteUploadResponseDto> {
    const user = req.user as { userId: string };
    return this.uploadService.completeUpload(
      user.userId,
      dto.cloud_storage_path,
      dto.fileName,
      dto.contentType,
      dto.fileSize,
    );
  }

  @Get('files/:id/url')
  async getFileUrl(
    @Param('id') id: string,
    @Query('mode') mode: string,
  ): Promise<FileUrlResponseDto> {
    return this.uploadService.getFileUrl(id, mode ?? 'view');
  }

  @Delete('files/:id')
  async deleteFile(@Param('id') id: string): Promise<SuccessResponseDto> {
    return this.uploadService.deleteFile(id);
  }
}
