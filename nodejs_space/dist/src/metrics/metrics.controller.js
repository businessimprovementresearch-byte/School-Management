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
exports.MetricsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const metrics_service_1 = require("./metrics.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const create_metric_dto_1 = require("./dto/create-metric.dto");
let MetricsController = class MetricsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async findAll(classId) {
        return this.service.findAll(classId);
    }
    async create(dto) {
        return this.service.create(dto);
    }
    async remove(id) {
        return this.service.remove(id);
    }
};
exports.MetricsController = MetricsController;
__decorate([
    openapi.ApiQuery({ name: "classId", required: false }),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./dto/metric-response.dto").MetricListItemDto] }),
    __param(0, (0, common_1.Query)('classId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    openapi.ApiResponse({ status: 201, type: require("./dto/metric-response.dto").MetricResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_metric_dto_1.CreateMetricDto]),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    openapi.ApiResponse({ status: 200, type: require("../common/dto/success-response.dto").SuccessResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "remove", null);
exports.MetricsController = MetricsController = __decorate([
    (0, swagger_1.ApiTags)('Metrics'),
    (0, common_1.Controller)('api/metrics'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [metrics_service_1.MetricsService])
], MetricsController);
//# sourceMappingURL=metrics.controller.js.map