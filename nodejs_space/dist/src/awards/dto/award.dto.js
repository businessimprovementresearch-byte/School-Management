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
exports.AwardIssuanceDto = exports.AwardListItemDto = exports.IssueAwardDto = exports.CreateAwardDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAwardDto {
    name;
    description;
    icon;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: false, type: () => String }, icon: { required: false, type: () => String } };
    }
}
exports.CreateAwardDto = CreateAwardDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAwardDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAwardDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAwardDto.prototype, "icon", void 0);
class IssueAwardDto {
    awardId;
    studentId;
    teacherId;
    note;
    static _OPENAPI_METADATA_FACTORY() {
        return { awardId: { required: true, type: () => String }, studentId: { required: false, type: () => String }, teacherId: { required: false, type: () => String }, note: { required: false, type: () => String } };
    }
}
exports.IssueAwardDto = IssueAwardDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IssueAwardDto.prototype, "awardId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], IssueAwardDto.prototype, "studentId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], IssueAwardDto.prototype, "teacherId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], IssueAwardDto.prototype, "note", void 0);
class AwardListItemDto {
    id;
    name;
    description;
    icon;
    issuedCount;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true }, icon: { required: true, type: () => String, nullable: true }, issuedCount: { required: true, type: () => Number } };
    }
}
exports.AwardListItemDto = AwardListItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AwardListItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AwardListItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AwardListItemDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AwardListItemDto.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AwardListItemDto.prototype, "issuedCount", void 0);
class AwardIssuanceDto {
    id;
    awardId;
    awardName;
    awardIcon;
    note;
    issuedAt;
    recipientName;
    recipientKind;
    studentId;
    teacherId;
    photoUrl;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, awardId: { required: true, type: () => String }, awardName: { required: true, type: () => String }, awardIcon: { required: true, type: () => String, nullable: true }, note: { required: true, type: () => String, nullable: true }, issuedAt: { required: true, type: () => String }, recipientName: { required: true, type: () => String }, recipientKind: { required: true, type: () => String }, studentId: { required: true, type: () => String, nullable: true }, teacherId: { required: true, type: () => String, nullable: true }, photoUrl: { required: true, type: () => String, nullable: true } };
    }
}
exports.AwardIssuanceDto = AwardIssuanceDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AwardIssuanceDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AwardIssuanceDto.prototype, "awardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AwardIssuanceDto.prototype, "awardName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AwardIssuanceDto.prototype, "awardIcon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AwardIssuanceDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AwardIssuanceDto.prototype, "issuedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AwardIssuanceDto.prototype, "recipientName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AwardIssuanceDto.prototype, "recipientKind", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AwardIssuanceDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AwardIssuanceDto.prototype, "teacherId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AwardIssuanceDto.prototype, "photoUrl", void 0);
//# sourceMappingURL=award.dto.js.map