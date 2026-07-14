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
exports.TeacherDetailResponseDto = exports.TeacherAttendanceSummaryDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const teacher_list_response_dto_1 = require("./teacher-list-response.dto");
class TeacherAttendanceSummaryDto {
    totalSessions;
    present;
    absent;
    percentage;
    static _OPENAPI_METADATA_FACTORY() {
        return { totalSessions: { required: true, type: () => Number }, present: { required: true, type: () => Number }, absent: { required: true, type: () => Number }, percentage: { required: true, type: () => Number } };
    }
}
exports.TeacherAttendanceSummaryDto = TeacherAttendanceSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TeacherAttendanceSummaryDto.prototype, "totalSessions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TeacherAttendanceSummaryDto.prototype, "present", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TeacherAttendanceSummaryDto.prototype, "absent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TeacherAttendanceSummaryDto.prototype, "percentage", void 0);
class TeacherDetailResponseDto {
    id;
    userId;
    name;
    dob;
    age;
    contactNumber;
    photoFileId;
    photoUrl;
    assignedClasses;
    attendanceSummary;
    createdAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, userId: { required: true, type: () => String }, name: { required: true, type: () => String }, dob: { required: true, type: () => String }, age: { required: true, type: () => Number }, contactNumber: { required: true, type: () => String }, photoFileId: { required: true, type: () => String, nullable: true }, photoUrl: { required: true, type: () => String, nullable: true }, assignedClasses: { required: true, type: () => [require("./teacher-list-response.dto").TeacherClassDto] }, attendanceSummary: { required: true, type: () => require("./teacher-detail-response.dto").TeacherAttendanceSummaryDto }, createdAt: { required: true, type: () => String } };
    }
}
exports.TeacherDetailResponseDto = TeacherDetailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherDetailResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherDetailResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherDetailResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherDetailResponseDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TeacherDetailResponseDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherDetailResponseDto.prototype, "contactNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], TeacherDetailResponseDto.prototype, "photoFileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], TeacherDetailResponseDto.prototype, "photoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [teacher_list_response_dto_1.TeacherClassDto] }),
    __metadata("design:type", Array)
], TeacherDetailResponseDto.prototype, "assignedClasses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => TeacherAttendanceSummaryDto }),
    __metadata("design:type", TeacherAttendanceSummaryDto)
], TeacherDetailResponseDto.prototype, "attendanceSummary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherDetailResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=teacher-detail-response.dto.js.map