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
exports.ReportCardsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const report_cards_service_1 = require("./report-cards.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const generate_report_card_dto_1 = require("./dto/generate-report-card.dto");
let ReportCardsController = class ReportCardsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async generate(req, dto) {
        const user = req.user;
        return this.service.generate(user.userId, dto.studentId, dto.academicYearId, dto.termId);
    }
    async findAll(studentId) {
        return this.service.findAll(studentId);
    }
    async getDownload(id) {
        return this.service.getDownloadUrl(id);
    }
};
exports.ReportCardsController = ReportCardsController;
__decorate([
    (0, common_1.Post)('generate'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    openapi.ApiResponse({ status: 201, type: require("./dto/report-card-response.dto").ReportCardResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, generate_report_card_dto_1.GenerateReportCardDto]),
    __metadata("design:returntype", Promise)
], ReportCardsController.prototype, "generate", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./dto/report-card-response.dto").ReportCardResponseDto] }),
    __param(0, (0, common_1.Query)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportCardsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id/download'),
    openapi.ApiResponse({ status: 200, type: require("../upload/dto/file-url-response.dto").FileUrlResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportCardsController.prototype, "getDownload", null);
exports.ReportCardsController = ReportCardsController = __decorate([
    (0, swagger_1.ApiTags)('Report Cards'),
    (0, common_1.Controller)('api/report-cards'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [report_cards_service_1.ReportCardsService])
], ReportCardsController);
//# sourceMappingURL=report-cards.controller.js.map