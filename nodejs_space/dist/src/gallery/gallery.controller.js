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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const gallery_service_1 = require("./gallery.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const gallery_dto_1 = require("./dto/gallery.dto");
let GalleryController = class GalleryController {
    service;
    constructor(service) {
        this.service = service;
    }
    async findAllAlbums(classId, eventId) {
        return this.service.findAllAlbums(classId, eventId);
    }
    async findAlbum(id) {
        return this.service.findAlbum(id);
    }
    async createAlbum(dto) {
        return this.service.createAlbum(dto);
    }
    async removeAlbum(id) {
        return this.service.removeAlbum(id);
    }
    async addPhoto(id, dto) {
        return this.service.addPhoto(id, dto);
    }
    async removePhoto(id) {
        return this.service.removePhoto(id);
    }
};
exports.GalleryController = GalleryController;
__decorate([
    openapi.ApiQuery({ name: "classId", required: false }),
    openapi.ApiQuery({ name: "eventId", required: false }),
    (0, common_1.Get)('albums'),
    openapi.ApiResponse({ status: 200, type: [require("./dto/gallery.dto").AlbumListItemDto] }),
    __param(0, (0, common_1.Query)('classId')),
    __param(1, (0, common_1.Query)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "findAllAlbums", null);
__decorate([
    (0, common_1.Get)('albums/:id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/gallery.dto").AlbumDetailDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "findAlbum", null);
__decorate([
    (0, common_1.Post)('albums'),
    openapi.ApiResponse({ status: 201, type: require("./dto/gallery.dto").AlbumListItemDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gallery_dto_1.CreateAlbumDto]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "createAlbum", null);
__decorate([
    (0, common_1.Delete)('albums/:id'),
    openapi.ApiResponse({ status: 200, type: require("../common/dto/success-response.dto").SuccessResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "removeAlbum", null);
__decorate([
    (0, common_1.Post)('albums/:id/photos'),
    openapi.ApiResponse({ status: 201, type: require("./dto/gallery.dto").GalleryPhotoDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, gallery_dto_1.AddPhotoDto]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "addPhoto", null);
__decorate([
    (0, common_1.Delete)('photos/:id'),
    openapi.ApiResponse({ status: 200, type: require("../common/dto/success-response.dto").SuccessResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "removePhoto", null);
exports.GalleryController = GalleryController = __decorate([
    (0, swagger_1.ApiTags)('Gallery'),
    (0, common_1.Controller)('api/gallery'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [gallery_service_1.GalleryService])
], GalleryController);
//# sourceMappingURL=gallery.controller.js.map