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
exports.ProgressListResponseDto = exports.ProgressMetricListDto = exports.ProgressEntryItemDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class ProgressEntryItemDto {
    id;
    date;
    sessionId;
    value;
    notes;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, date: { required: true, type: () => String }, sessionId: { required: true, type: () => String }, value: { required: true, type: () => Number }, notes: { required: true, type: () => String, nullable: true } };
    }
}
exports.ProgressEntryItemDto = ProgressEntryItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProgressEntryItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProgressEntryItemDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProgressEntryItemDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProgressEntryItemDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], ProgressEntryItemDto.prototype, "notes", void 0);
class ProgressMetricListDto {
    metricId;
    metricName;
    metricType;
    entries;
    static _OPENAPI_METADATA_FACTORY() {
        return { metricId: { required: true, type: () => String }, metricName: { required: true, type: () => String }, metricType: { required: true, type: () => String }, entries: { required: true, type: () => [require("./progress-list-response.dto").ProgressEntryItemDto] } };
    }
}
exports.ProgressMetricListDto = ProgressMetricListDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProgressMetricListDto.prototype, "metricId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProgressMetricListDto.prototype, "metricName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProgressMetricListDto.prototype, "metricType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [ProgressEntryItemDto] }),
    __metadata("design:type", Array)
], ProgressMetricListDto.prototype, "entries", void 0);
class ProgressListResponseDto {
    metrics;
    static _OPENAPI_METADATA_FACTORY() {
        return { metrics: { required: true, type: () => [require("./progress-list-response.dto").ProgressMetricListDto] } };
    }
}
exports.ProgressListResponseDto = ProgressListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [ProgressMetricListDto] }),
    __metadata("design:type", Array)
], ProgressListResponseDto.prototype, "metrics", void 0);
//# sourceMappingURL=progress-list-response.dto.js.map