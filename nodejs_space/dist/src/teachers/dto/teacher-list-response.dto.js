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
exports.TeacherListItemDto = exports.TeacherClassDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class TeacherClassDto {
    id;
    name;
    grade;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, grade: { required: true, type: () => String } };
    }
}
exports.TeacherClassDto = TeacherClassDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherClassDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherClassDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherClassDto.prototype, "grade", void 0);
class TeacherListItemDto {
    id;
    userId;
    name;
    dob;
    age;
    contactNumber;
    photoFileId;
    photoUrl;
    assignedClasses;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, userId: { required: true, type: () => String }, name: { required: true, type: () => String }, dob: { required: true, type: () => String }, age: { required: true, type: () => Number }, contactNumber: { required: true, type: () => String }, photoFileId: { required: true, type: () => String, nullable: true }, photoUrl: { required: true, type: () => String, nullable: true }, assignedClasses: { required: true, type: () => [require("./teacher-list-response.dto").TeacherClassDto] } };
    }
}
exports.TeacherListItemDto = TeacherListItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherListItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherListItemDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherListItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherListItemDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TeacherListItemDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherListItemDto.prototype, "contactNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], TeacherListItemDto.prototype, "photoFileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], TeacherListItemDto.prototype, "photoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [TeacherClassDto] }),
    __metadata("design:type", Array)
], TeacherListItemDto.prototype, "assignedClasses", void 0);
//# sourceMappingURL=teacher-list-response.dto.js.map