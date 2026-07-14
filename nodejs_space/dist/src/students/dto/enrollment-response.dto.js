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
exports.UpdateEnrollmentResponseDto = exports.EnrollmentResponseDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class EnrollmentResponseDto {
    id;
    studentId;
    classId;
    enrollmentDate;
    status;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, studentId: { required: true, type: () => String }, classId: { required: true, type: () => String }, enrollmentDate: { required: true, type: () => String }, status: { required: true, type: () => String } };
    }
}
exports.EnrollmentResponseDto = EnrollmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EnrollmentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EnrollmentResponseDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EnrollmentResponseDto.prototype, "classId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EnrollmentResponseDto.prototype, "enrollmentDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EnrollmentResponseDto.prototype, "status", void 0);
class UpdateEnrollmentResponseDto {
    id;
    status;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, status: { required: true, type: () => String } };
    }
}
exports.UpdateEnrollmentResponseDto = UpdateEnrollmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateEnrollmentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateEnrollmentResponseDto.prototype, "status", void 0);
//# sourceMappingURL=enrollment-response.dto.js.map