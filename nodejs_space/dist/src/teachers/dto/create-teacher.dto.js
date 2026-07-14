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
exports.CreateTeacherDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateTeacherDto {
    email;
    password;
    name;
    dob;
    contactNumber;
    photoFileId;
    classIds;
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String, format: "email" }, password: { required: true, type: () => String, minLength: 6 }, name: { required: true, type: () => String }, dob: { required: true, type: () => String }, contactNumber: { required: true, type: () => String }, photoFileId: { required: false, type: () => String, nullable: true, format: "uuid" }, classIds: { required: false, type: () => [String], format: "uuid" } };
    }
}
exports.CreateTeacherDto = CreateTeacherDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "dob", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "contactNumber", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateTeacherDto.prototype, "photoFileId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateTeacherDto.prototype, "classIds", void 0);
//# sourceMappingURL=create-teacher.dto.js.map