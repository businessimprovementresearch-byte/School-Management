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
exports.ProgressController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const progress_service_1 = require("./progress.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_progress_dto_1 = require("./dto/create-progress.dto");
let ProgressController = class ProgressController {
    progressService;
    constructor(progressService) {
        this.progressService = progressService;
    }
    async create(dto) {
        return this.progressService.create(dto);
    }
    async findByStudent(studentId, classId) {
        return this.progressService.findByStudentAndClass(studentId, classId);
    }
};
exports.ProgressController = ProgressController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./dto/progress-response.dto").ProgressResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_progress_dto_1.CreateProgressDto]),
    __metadata("design:returntype", Promise)
], ProgressController.prototype, "create", null);
__decorate([
    openapi.ApiQuery({ name: "classId", required: false }),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: require("./dto/progress-list-response.dto").ProgressListResponseDto }),
    __param(0, (0, common_1.Query)('studentId')),
    __param(1, (0, common_1.Query)('classId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProgressController.prototype, "findByStudent", null);
exports.ProgressController = ProgressController = __decorate([
    (0, swagger_1.ApiTags)('Progress'),
    (0, common_1.Controller)('api/progress'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [progress_service_1.ProgressService])
], ProgressController);
//# sourceMappingURL=progress.controller.js.map