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
exports.AcademicYearsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const academic_years_service_1 = require("./academic-years.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const create_academic_year_dto_1 = require("./dto/create-academic-year.dto");
const update_academic_year_dto_1 = require("./dto/update-academic-year.dto");
let AcademicYearsController = class AcademicYearsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async findAll() {
        return this.service.findAll();
    }
    async create(dto) {
        return this.service.create(dto);
    }
    async update(id, dto) {
        return this.service.update(id, dto);
    }
};
exports.AcademicYearsController = AcademicYearsController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./dto/academic-year-response.dto").AcademicYearListItemDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AcademicYearsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    openapi.ApiResponse({ status: 201, type: require("./dto/academic-year-response.dto").AcademicYearResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_academic_year_dto_1.CreateAcademicYearDto]),
    __metadata("design:returntype", Promise)
], AcademicYearsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    openapi.ApiResponse({ status: 200, type: require("./dto/academic-year-response.dto").AcademicYearResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_academic_year_dto_1.UpdateAcademicYearDto]),
    __metadata("design:returntype", Promise)
], AcademicYearsController.prototype, "update", null);
exports.AcademicYearsController = AcademicYearsController = __decorate([
    (0, swagger_1.ApiTags)('Academic Years'),
    (0, common_1.Controller)('api/academic-years'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [academic_years_service_1.AcademicYearsService])
], AcademicYearsController);
//# sourceMappingURL=academic-years.controller.js.map