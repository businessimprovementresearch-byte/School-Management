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
exports.UpdateTeacherDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateTeacherDto {
    name;
    dob;
    contactNumber;
    photoFileId;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, dob: { required: false, type: () => String }, contactNumber: { required: false, type: () => String }, photoFileId: { required: false, type: () => String, nullable: true, format: "uuid" } };
    }
}
exports.UpdateTeacherDto = UpdateTeacherDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "dob", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "contactNumber", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateTeacherDto.prototype, "photoFileId", void 0);
//# sourceMappingURL=update-teacher.dto.js.map