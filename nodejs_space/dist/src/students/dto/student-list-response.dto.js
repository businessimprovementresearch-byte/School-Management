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
exports.StudentListResponseDto = exports.StudentListItemDto = exports.EnrolledClassDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class EnrolledClassDto {
    id;
    name;
    grade;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, grade: { required: true, type: () => String } };
    }
}
exports.EnrolledClassDto = EnrolledClassDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EnrolledClassDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EnrolledClassDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EnrolledClassDto.prototype, "grade", void 0);
class StudentListItemDto {
    id;
    name;
    parentName;
    dob;
    age;
    contactNumber;
    photoFileId;
    photoUrl;
    enrolledClasses;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, parentName: { required: true, type: () => String }, dob: { required: true, type: () => String }, age: { required: true, type: () => Number }, contactNumber: { required: true, type: () => String }, photoFileId: { required: true, type: () => String, nullable: true }, photoUrl: { required: true, type: () => String, nullable: true }, enrolledClasses: { required: true, type: () => [require("./student-list-response.dto").EnrolledClassDto] } };
    }
}
exports.StudentListItemDto = StudentListItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StudentListItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StudentListItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StudentListItemDto.prototype, "parentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StudentListItemDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StudentListItemDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StudentListItemDto.prototype, "contactNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], StudentListItemDto.prototype, "photoFileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], StudentListItemDto.prototype, "photoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [EnrolledClassDto] }),
    __metadata("design:type", Array)
], StudentListItemDto.prototype, "enrolledClasses", void 0);
class StudentListResponseDto {
    items;
    total;
    page;
    totalPages;
    static _OPENAPI_METADATA_FACTORY() {
        return { items: { required: true, type: () => [require("./student-list-response.dto").StudentListItemDto] }, total: { required: true, type: () => Number }, page: { required: true, type: () => Number }, totalPages: { required: true, type: () => Number } };
    }
}
exports.StudentListResponseDto = StudentListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [StudentListItemDto] }),
    __metadata("design:type", Array)
], StudentListResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StudentListResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StudentListResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StudentListResponseDto.prototype, "totalPages", void 0);
//# sourceMappingURL=student-list-response.dto.js.map