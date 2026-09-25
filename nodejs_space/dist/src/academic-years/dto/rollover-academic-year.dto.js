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
exports.RolloverAcademicYearDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RolloverAcademicYearDto {
    fromAcademicYearId;
    excludeStudentIds;
    excludeTeacherIds;
    static _OPENAPI_METADATA_FACTORY() {
        return { fromAcademicYearId: { required: false, type: () => String, format: "uuid" }, excludeStudentIds: { required: false, type: () => [String] }, excludeTeacherIds: { required: false, type: () => [String] } };
    }
}
exports.RolloverAcademicYearDto = RolloverAcademicYearDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RolloverAcademicYearDto.prototype, "fromAcademicYearId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], RolloverAcademicYearDto.prototype, "excludeStudentIds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], RolloverAcademicYearDto.prototype, "excludeTeacherIds", void 0);
//# sourceMappingURL=rollover-academic-year.dto.js.map