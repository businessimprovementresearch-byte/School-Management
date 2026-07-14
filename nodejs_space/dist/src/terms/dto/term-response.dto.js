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
exports.TermListItemDto = exports.TermResponseDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class TermResponseDto {
    id;
    name;
    startDate;
    endDate;
    academicYearId;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, startDate: { required: true, type: () => String }, endDate: { required: true, type: () => String }, academicYearId: { required: true, type: () => String } };
    }
}
exports.TermResponseDto = TermResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TermResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TermResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TermResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TermResponseDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TermResponseDto.prototype, "academicYearId", void 0);
class TermListItemDto {
    id;
    name;
    startDate;
    endDate;
    academicYearId;
    academicYearName;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, startDate: { required: true, type: () => String }, endDate: { required: true, type: () => String }, academicYearId: { required: true, type: () => String }, academicYearName: { required: true, type: () => String } };
    }
}
exports.TermListItemDto = TermListItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TermListItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TermListItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TermListItemDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TermListItemDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TermListItemDto.prototype, "academicYearId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TermListItemDto.prototype, "academicYearName", void 0);
//# sourceMappingURL=term-response.dto.js.map