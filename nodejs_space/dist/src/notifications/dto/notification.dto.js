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
exports.CheckAlertsResultDto = exports.UpdateAlertSettingDto = exports.AlertSettingDto = exports.UnreadCountDto = exports.NotificationDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class NotificationDto {
    id;
    teacherId;
    title;
    body;
    type;
    read;
    createdAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, teacherId: { required: true, type: () => String, nullable: true }, title: { required: true, type: () => String }, body: { required: true, type: () => String }, type: { required: true, type: () => String }, read: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => String } };
    }
}
exports.NotificationDto = NotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], NotificationDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], NotificationDto.prototype, "teacherId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], NotificationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], NotificationDto.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], NotificationDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], NotificationDto.prototype, "read", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], NotificationDto.prototype, "createdAt", void 0);
class UnreadCountDto {
    count;
    static _OPENAPI_METADATA_FACTORY() {
        return { count: { required: true, type: () => Number } };
    }
}
exports.UnreadCountDto = UnreadCountDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UnreadCountDto.prototype, "count", void 0);
class AlertSettingDto {
    teacherId;
    teacherName;
    delayMinutes;
    enabled;
    channel;
    static _OPENAPI_METADATA_FACTORY() {
        return { teacherId: { required: true, type: () => String }, teacherName: { required: true, type: () => String }, delayMinutes: { required: true, type: () => Number }, enabled: { required: true, type: () => Boolean }, channel: { required: true, type: () => String } };
    }
}
exports.AlertSettingDto = AlertSettingDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AlertSettingDto.prototype, "teacherId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AlertSettingDto.prototype, "teacherName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AlertSettingDto.prototype, "delayMinutes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], AlertSettingDto.prototype, "enabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AlertSettingDto.prototype, "channel", void 0);
class UpdateAlertSettingDto {
    delayMinutes;
    enabled;
    channel;
    static _OPENAPI_METADATA_FACTORY() {
        return { delayMinutes: { required: false, type: () => Number, minimum: 0 }, enabled: { required: false, type: () => Boolean }, channel: { required: false, type: () => String } };
    }
}
exports.UpdateAlertSettingDto = UpdateAlertSettingDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAlertSettingDto.prototype, "delayMinutes", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateAlertSettingDto.prototype, "enabled", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAlertSettingDto.prototype, "channel", void 0);
class CheckAlertsResultDto {
    created;
    checkedSessions;
    static _OPENAPI_METADATA_FACTORY() {
        return { created: { required: true, type: () => Number }, checkedSessions: { required: true, type: () => Number } };
    }
}
exports.CheckAlertsResultDto = CheckAlertsResultDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CheckAlertsResultDto.prototype, "created", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CheckAlertsResultDto.prototype, "checkedSessions", void 0);
//# sourceMappingURL=notification.dto.js.map