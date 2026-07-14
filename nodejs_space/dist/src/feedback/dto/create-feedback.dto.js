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
exports.CreateFeedbackDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateFeedbackDto {
    classSessionId;
    content;
    type;
    studentId;
    static _OPENAPI_METADATA_FACTORY() {
        return { classSessionId: { required: true, type: () => String, format: "uuid" }, content: { required: true, type: () => String }, type: { required: true, type: () => String }, studentId: { required: false, type: () => String, nullable: true, format: "uuid" } };
    }
}
exports.CreateFeedbackDto = CreateFeedbackDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateFeedbackDto.prototype, "classSessionId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFeedbackDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['STUDENT_SPECIFIC', 'GENERAL']),
    __metadata("design:type", String)
], CreateFeedbackDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateFeedbackDto.prototype, "studentId", void 0);
//# sourceMappingURL=create-feedback.dto.js.map