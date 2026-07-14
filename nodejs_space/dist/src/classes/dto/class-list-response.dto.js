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
exports.ClassListItemDto = exports.ClassTeacherDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class ClassTeacherDto {
    id;
    name;
    photoFileId;
    photoUrl;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, photoFileId: { required: true, type: () => String, nullable: true }, photoUrl: { required: true, type: () => String, nullable: true } };
    }
}
exports.ClassTeacherDto = ClassTeacherDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassTeacherDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassTeacherDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], ClassTeacherDto.prototype, "photoFileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], ClassTeacherDto.prototype, "photoUrl", void 0);
class ClassListItemDto {
    id;
    name;
    grade;
    description;
    studentCount;
    teachers;
    nextSessionDate;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, grade: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true }, studentCount: { required: true, type: () => Number }, teachers: { required: true, type: () => [require("./class-list-response.dto").ClassTeacherDto] }, nextSessionDate: { required: true, type: () => String, nullable: true } };
    }
}
exports.ClassListItemDto = ClassListItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassListItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassListItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassListItemDto.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], ClassListItemDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ClassListItemDto.prototype, "studentCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [ClassTeacherDto] }),
    __metadata("design:type", Array)
], ClassListItemDto.prototype, "teachers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], ClassListItemDto.prototype, "nextSessionDate", void 0);
//# sourceMappingURL=class-list-response.dto.js.map