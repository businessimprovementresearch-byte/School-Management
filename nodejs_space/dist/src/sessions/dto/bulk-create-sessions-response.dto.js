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
exports.BulkCreateSessionsResponseDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class BulkCreateSessionsResponseDto {
    success;
    date;
    totalClasses;
    createdCount;
    skippedCount;
    createdClassNames;
    skippedClassNames;
    static _OPENAPI_METADATA_FACTORY() {
        return { success: { required: true, type: () => Boolean }, date: { required: true, type: () => String }, totalClasses: { required: true, type: () => Number }, createdCount: { required: true, type: () => Number }, skippedCount: { required: true, type: () => Number }, createdClassNames: { required: true, type: () => [String] }, skippedClassNames: { required: true, type: () => [String] } };
    }
}
exports.BulkCreateSessionsResponseDto = BulkCreateSessionsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], BulkCreateSessionsResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BulkCreateSessionsResponseDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BulkCreateSessionsResponseDto.prototype, "totalClasses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BulkCreateSessionsResponseDto.prototype, "createdCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BulkCreateSessionsResponseDto.prototype, "skippedCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [String] }),
    __metadata("design:type", Array)
], BulkCreateSessionsResponseDto.prototype, "createdClassNames", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [String] }),
    __metadata("design:type", Array)
], BulkCreateSessionsResponseDto.prototype, "skippedClassNames", void 0);
//# sourceMappingURL=bulk-create-sessions-response.dto.js.map