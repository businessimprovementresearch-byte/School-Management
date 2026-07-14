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
exports.DashboardResponseDto = exports.ActiveAcademicYearDto = exports.DashboardFeedbackDto = exports.PendingSessionDto = exports.DashboardSessionDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class DashboardSessionDto {
    id;
    classId;
    className;
    date;
    attendanceSubmitted;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, classId: { required: true, type: () => String }, className: { required: true, type: () => String }, date: { required: true, type: () => String }, attendanceSubmitted: { required: true, type: () => Boolean } };
    }
}
exports.DashboardSessionDto = DashboardSessionDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DashboardSessionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DashboardSessionDto.prototype, "classId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DashboardSessionDto.prototype, "className", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DashboardSessionDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], DashboardSessionDto.prototype, "attendanceSubmitted", void 0);
class PendingSessionDto {
    id;
    classId;
    className;
    date;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, classId: { required: true, type: () => String }, className: { required: true, type: () => String }, date: { required: true, type: () => String } };
    }
}
exports.PendingSessionDto = PendingSessionDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PendingSessionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PendingSessionDto.prototype, "classId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PendingSessionDto.prototype, "className", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PendingSessionDto.prototype, "date", void 0);
class DashboardFeedbackDto {
    id;
    classSessionId;
    teacherId;
    teacherName;
    studentId;
    studentName;
    content;
    type;
    createdAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, classSessionId: { required: true, type: () => String }, teacherId: { required: true, type: () => String }, teacherName: { required: true, type: () => String }, studentId: { required: true, type: () => String, nullable: true }, studentName: { required: true, type: () => String, nullable: true }, content: { required: true, type: () => String }, type: { required: true, type: () => String }, createdAt: { required: true, type: () => String } };
    }
}
exports.DashboardFeedbackDto = DashboardFeedbackDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DashboardFeedbackDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DashboardFeedbackDto.prototype, "classSessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DashboardFeedbackDto.prototype, "teacherId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DashboardFeedbackDto.prototype, "teacherName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], DashboardFeedbackDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], DashboardFeedbackDto.prototype, "studentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DashboardFeedbackDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DashboardFeedbackDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DashboardFeedbackDto.prototype, "createdAt", void 0);
class ActiveAcademicYearDto {
    id;
    name;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String } };
    }
}
exports.ActiveAcademicYearDto = ActiveAcademicYearDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ActiveAcademicYearDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ActiveAcademicYearDto.prototype, "name", void 0);
class DashboardResponseDto {
    totalStudents;
    totalTeachers;
    activeClasses;
    todaySessions;
    pendingAttendanceSessions;
    recentFeedback;
    activeAcademicYear;
    static _OPENAPI_METADATA_FACTORY() {
        return { totalStudents: { required: true, type: () => Number }, totalTeachers: { required: true, type: () => Number }, activeClasses: { required: true, type: () => Number }, todaySessions: { required: true, type: () => [require("./dashboard-response.dto").DashboardSessionDto] }, pendingAttendanceSessions: { required: true, type: () => [require("./dashboard-response.dto").PendingSessionDto] }, recentFeedback: { required: true, type: () => [require("./dashboard-response.dto").DashboardFeedbackDto] }, activeAcademicYear: { required: true, type: () => require("./dashboard-response.dto").ActiveAcademicYearDto, nullable: true } };
    }
}
exports.DashboardResponseDto = DashboardResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DashboardResponseDto.prototype, "totalStudents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DashboardResponseDto.prototype, "totalTeachers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DashboardResponseDto.prototype, "activeClasses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [DashboardSessionDto] }),
    __metadata("design:type", Array)
], DashboardResponseDto.prototype, "todaySessions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [PendingSessionDto] }),
    __metadata("design:type", Array)
], DashboardResponseDto.prototype, "pendingAttendanceSessions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [DashboardFeedbackDto] }),
    __metadata("design:type", Array)
], DashboardResponseDto.prototype, "recentFeedback", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: () => ActiveAcademicYearDto }),
    __metadata("design:type", Object)
], DashboardResponseDto.prototype, "activeAcademicYear", void 0);
//# sourceMappingURL=dashboard-response.dto.js.map