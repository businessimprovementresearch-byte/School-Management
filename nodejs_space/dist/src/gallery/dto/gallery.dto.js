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
exports.AlbumDetailDto = exports.GalleryPhotoDto = exports.AlbumListItemDto = exports.AddPhotoDto = exports.CreateAlbumDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAlbumDto {
    title;
    description;
    classId;
    eventId;
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, description: { required: false, type: () => String }, classId: { required: false, type: () => String }, eventId: { required: false, type: () => String } };
    }
}
exports.CreateAlbumDto = CreateAlbumDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAlbumDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAlbumDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAlbumDto.prototype, "classId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAlbumDto.prototype, "eventId", void 0);
class AddPhotoDto {
    fileId;
    caption;
    static _OPENAPI_METADATA_FACTORY() {
        return { fileId: { required: true, type: () => String }, caption: { required: false, type: () => String } };
    }
}
exports.AddPhotoDto = AddPhotoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddPhotoDto.prototype, "fileId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddPhotoDto.prototype, "caption", void 0);
class AlbumListItemDto {
    id;
    title;
    description;
    className;
    eventName;
    photoCount;
    coverUrl;
    createdAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, title: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true }, className: { required: true, type: () => String, nullable: true }, eventName: { required: true, type: () => String, nullable: true }, photoCount: { required: true, type: () => Number }, coverUrl: { required: true, type: () => String, nullable: true }, createdAt: { required: true, type: () => String } };
    }
}
exports.AlbumListItemDto = AlbumListItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AlbumListItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AlbumListItemDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AlbumListItemDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AlbumListItemDto.prototype, "className", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AlbumListItemDto.prototype, "eventName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AlbumListItemDto.prototype, "photoCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AlbumListItemDto.prototype, "coverUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AlbumListItemDto.prototype, "createdAt", void 0);
class GalleryPhotoDto {
    id;
    fileId;
    caption;
    url;
    createdAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, fileId: { required: true, type: () => String }, caption: { required: true, type: () => String, nullable: true }, url: { required: true, type: () => String, nullable: true }, createdAt: { required: true, type: () => String } };
    }
}
exports.GalleryPhotoDto = GalleryPhotoDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GalleryPhotoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GalleryPhotoDto.prototype, "fileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], GalleryPhotoDto.prototype, "caption", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], GalleryPhotoDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GalleryPhotoDto.prototype, "createdAt", void 0);
class AlbumDetailDto {
    id;
    title;
    description;
    className;
    eventName;
    photos;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, title: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true }, className: { required: true, type: () => String, nullable: true }, eventName: { required: true, type: () => String, nullable: true }, photos: { required: true, type: () => [require("./gallery.dto").GalleryPhotoDto] } };
    }
}
exports.AlbumDetailDto = AlbumDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AlbumDetailDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AlbumDetailDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AlbumDetailDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AlbumDetailDto.prototype, "className", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AlbumDetailDto.prototype, "eventName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [GalleryPhotoDto] }),
    __metadata("design:type", Array)
], AlbumDetailDto.prototype, "photos", void 0);
//# sourceMappingURL=gallery.dto.js.map