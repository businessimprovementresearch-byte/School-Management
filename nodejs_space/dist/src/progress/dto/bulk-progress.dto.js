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
exports.BulkProgressDto = exports.ProgressScoreEntry = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ProgressScoreEntry {
    studentId;
    value;
    notes;
    static _OPENAPI_METADATA_FACTORY() {
        return { studentId: { required: true, type: () => String, format: "uuid" }, value: { required: true, type: () => Number }, notes: { required: false, type: () => String, nullable: true } };
    }
}
exports.ProgressScoreEntry = ProgressScoreEntry;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProgressScoreEntry.prototype, "studentId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProgressScoreEntry.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ProgressScoreEntry.prototype, "notes", void 0);
class BulkProgressDto {
    classSessionId;
    progressMetricId;
    entries;
    static _OPENAPI_METADATA_FACTORY() {
        return { classSessionId: { required: true, type: () => String, format: "uuid" }, progressMetricId: { required: true, type: () => String, format: "uuid" }, entries: { required: true, type: () => [require("./bulk-progress.dto").ProgressScoreEntry] } };
    }
}
exports.BulkProgressDto = BulkProgressDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], BulkProgressDto.prototype, "classSessionId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], BulkProgressDto.prototype, "progressMetricId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ProgressScoreEntry),
    __metadata("design:type", Array)
], BulkProgressDto.prototype, "entries", void 0);
//# sourceMappingURL=bulk-progress.dto.js.map