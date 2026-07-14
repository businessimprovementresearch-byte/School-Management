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
exports.AttendanceController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const attendance_service_1 = require("./attendance.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const bulk_attendance_dto_1 = require("./dto/bulk-attendance.dto");
let AttendanceController = class AttendanceController {
    attendanceService;
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    async bulkSave(dto) {
        return this.attendanceService.bulkSave(dto.sessionId, dto.studentAttendance, dto.teacherAttendance);
    }
    async getOverview(classId, month, year) {
        return this.attendanceService.getOverview(classId, month, year);
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, common_1.Post)('bulk'),
    openapi.ApiResponse({ status: 201, type: require("./dto/bulk-attendance-response.dto").BulkAttendanceResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_attendance_dto_1.BulkAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "bulkSave", null);
__decorate([
    (0, common_1.Get)('overview'),
    openapi.ApiResponse({ status: 200, type: require("./dto/attendance-overview-response.dto").AttendanceOverviewResponseDto }),
    __param(0, (0, common_1.Query)('classId')),
    __param(1, (0, common_1.Query)('month', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('year', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getOverview", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, swagger_1.ApiTags)('Attendance'),
    (0, common_1.Controller)('api/attendance'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map