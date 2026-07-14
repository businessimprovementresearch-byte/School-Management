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
exports.ClassDetailResponseDto = exports.ClassMetricInfoDto = exports.ClassSessionInfoDto = exports.ClassStudentDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_list_response_dto_1 = require("./class-list-response.dto");
class ClassStudentDto {
    id;
    name;
    photoFileId;
    photoUrl;
    enrollmentStatus;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, photoFileId: { required: true, type: () => String, nullable: true }, photoUrl: { required: true, type: () => String, nullable: true }, enrollmentStatus: { required: true, type: () => String } };
    }
}
exports.ClassStudentDto = ClassStudentDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassStudentDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassStudentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], ClassStudentDto.prototype, "photoFileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], ClassStudentDto.prototype, "photoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassStudentDto.prototype, "enrollmentStatus", void 0);
class ClassSessionInfoDto {
    id;
    date;
    attendanceSubmitted;
    termName;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, date: { required: true, type: () => String }, attendanceSubmitted: { required: true, type: () => Boolean }, termName: { required: true, type: () => String, nullable: true } };
    }
}
exports.ClassSessionInfoDto = ClassSessionInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassSessionInfoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassSessionInfoDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ClassSessionInfoDto.prototype, "attendanceSubmitted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], ClassSessionInfoDto.prototype, "termName", void 0);
class ClassMetricInfoDto {
    id;
    name;
    type;
    description;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, type: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true } };
    }
}
exports.ClassMetricInfoDto = ClassMetricInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassMetricInfoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassMetricInfoDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassMetricInfoDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], ClassMetricInfoDto.prototype, "description", void 0);
class ClassDetailResponseDto {
    id;
    name;
    grade;
    description;
    teachers;
    students;
    sessions;
    metrics;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, grade: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true }, teachers: { required: true, type: () => [require("./class-list-response.dto").ClassTeacherDto] }, students: { required: true, type: () => [require("./class-detail-response.dto").ClassStudentDto] }, sessions: { required: true, type: () => [require("./class-detail-response.dto").ClassSessionInfoDto] }, metrics: { required: true, type: () => [require("./class-detail-response.dto").ClassMetricInfoDto] } };
    }
}
exports.ClassDetailResponseDto = ClassDetailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassDetailResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassDetailResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassDetailResponseDto.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], ClassDetailResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [class_list_response_dto_1.ClassTeacherDto] }),
    __metadata("design:type", Array)
], ClassDetailResponseDto.prototype, "teachers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [ClassStudentDto] }),
    __metadata("design:type", Array)
], ClassDetailResponseDto.prototype, "students", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [ClassSessionInfoDto] }),
    __metadata("design:type", Array)
], ClassDetailResponseDto.prototype, "sessions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [ClassMetricInfoDto] }),
    __metadata("design:type", Array)
], ClassDetailResponseDto.prototype, "metrics", void 0);
//# sourceMappingURL=class-detail-response.dto.js.map