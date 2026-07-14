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
exports.TermsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const terms_service_1 = require("./terms.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const create_term_dto_1 = require("./dto/create-term.dto");
let TermsController = class TermsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async findAll(academicYearId) {
        return this.service.findAll(academicYearId);
    }
    async create(dto) {
        return this.service.create(dto);
    }
    async remove(id) {
        return this.service.remove(id);
    }
};
exports.TermsController = TermsController;
__decorate([
    openapi.ApiQuery({ name: "academicYearId", required: false }),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./dto/term-response.dto").TermListItemDto] }),
    __param(0, (0, common_1.Query)('academicYearId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TermsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    openapi.ApiResponse({ status: 201, type: require("./dto/term-response.dto").TermResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_term_dto_1.CreateTermDto]),
    __metadata("design:returntype", Promise)
], TermsController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    openapi.ApiResponse({ status: 200, type: require("../common/dto/success-response.dto").SuccessResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TermsController.prototype, "remove", null);
exports.TermsController = TermsController = __decorate([
    (0, swagger_1.ApiTags)('Terms'),
    (0, common_1.Controller)('api/terms'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [terms_service_1.TermsService])
], TermsController);
//# sourceMappingURL=terms.controller.js.map