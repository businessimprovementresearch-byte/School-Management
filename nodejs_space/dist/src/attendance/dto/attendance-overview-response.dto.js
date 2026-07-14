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
exports.AttendanceOverviewResponseDto = exports.StudentBreakdownDto = exports.ClassSummaryDto = exports.SessionSummaryDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class SessionSummaryDto {
    id;
    date;
    attendanceSubmitted;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, date: { required: true, type: () => String }, attendanceSubmitted: { required: true, type: () => Boolean } };
    }
}
exports.SessionSummaryDto = SessionSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SessionSummaryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SessionSummaryDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], SessionSummaryDto.prototype, "attendanceSubmitted", void 0);
class ClassSummaryDto {
    totalSessions;
    averageAttendance;
    static _OPENAPI_METADATA_FACTORY() {
        return { totalSessions: { required: true, type: () => Number }, averageAttendance: { required: true, type: () => Number } };
    }
}
exports.ClassSummaryDto = ClassSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ClassSummaryDto.prototype, "totalSessions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ClassSummaryDto.prototype, "averageAttendance", void 0);
class StudentBreakdownDto {
    studentId;
    studentName;
    present;
    absent;
    late;
    excused;
    total;
    percentage;
    static _OPENAPI_METADATA_FACTORY() {
        return { studentId: { required: true, type: () => String }, studentName: { required: true, type: () => String }, present: { required: true, type: () => Number }, absent: { required: true, type: () => Number }, late: { required: true, type: () => Number }, excused: { required: true, type: () => Number }, total: { required: true, type: () => Number }, percentage: { required: true, type: () => Number } };
    }
}
exports.StudentBreakdownDto = StudentBreakdownDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StudentBreakdownDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StudentBreakdownDto.prototype, "studentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StudentBreakdownDto.prototype, "present", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StudentBreakdownDto.prototype, "absent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StudentBreakdownDto.prototype, "late", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StudentBreakdownDto.prototype, "excused", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StudentBreakdownDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StudentBreakdownDto.prototype, "percentage", void 0);
class AttendanceOverviewResponseDto {
    sessions;
    classSummary;
    studentBreakdown;
    static _OPENAPI_METADATA_FACTORY() {
        return { sessions: { required: true, type: () => [require("./attendance-overview-response.dto").SessionSummaryDto] }, classSummary: { required: true, type: () => require("./attendance-overview-response.dto").ClassSummaryDto }, studentBreakdown: { required: true, type: () => [require("./attendance-overview-response.dto").StudentBreakdownDto] } };
    }
}
exports.AttendanceOverviewResponseDto = AttendanceOverviewResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [SessionSummaryDto] }),
    __metadata("design:type", Array)
], AttendanceOverviewResponseDto.prototype, "sessions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => ClassSummaryDto }),
    __metadata("design:type", ClassSummaryDto)
], AttendanceOverviewResponseDto.prototype, "classSummary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [StudentBreakdownDto] }),
    __metadata("design:type", Array)
], AttendanceOverviewResponseDto.prototype, "studentBreakdown", void 0);
//# sourceMappingURL=attendance-overview-response.dto.js.map