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
exports.UploadController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const upload_service_1 = require("./upload.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const presigned_upload_dto_1 = require("./dto/presigned-upload.dto");
const complete_upload_dto_1 = require("./dto/complete-upload.dto");
let UploadController = class UploadController {
    uploadService;
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async getPresignedUrl(dto) {
        return this.uploadService.getPresignedUploadUrl(dto.fileName, dto.contentType, dto.isPublic ?? false);
    }
    async completeUpload(req, dto) {
        const user = req.user;
        return this.uploadService.completeUpload(user.userId, dto.cloud_storage_path, dto.fileName, dto.contentType, dto.fileSize);
    }
    async getFileUrl(id, mode) {
        return this.uploadService.getFileUrl(id, mode ?? 'view');
    }
    async deleteFile(id) {
        return this.uploadService.deleteFile(id);
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('upload/presigned'),
    openapi.ApiResponse({ status: 201, type: require("./dto/presigned-upload-response.dto").PresignedUploadResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [presigned_upload_dto_1.PresignedUploadDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "getPresignedUrl", null);
__decorate([
    (0, common_1.Post)('upload/complete'),
    openapi.ApiResponse({ status: 201, type: require("./dto/complete-upload-response.dto").CompleteUploadResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, complete_upload_dto_1.CompleteUploadDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "completeUpload", null);
__decorate([
    (0, common_1.Get)('files/:id/url'),
    openapi.ApiResponse({ status: 200, type: require("./dto/file-url-response.dto").FileUrlResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('mode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "getFileUrl", null);
__decorate([
    (0, common_1.Delete)('files/:id'),
    openapi.ApiResponse({ status: 200, type: require("../common/dto/success-response.dto").SuccessResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "deleteFile", null);
exports.UploadController = UploadController = __decorate([
    (0, swagger_1.ApiTags)('Upload'),
    (0, common_1.Controller)('api'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map