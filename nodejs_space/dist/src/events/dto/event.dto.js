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
exports.EventDetailDto = exports.EventGroupDto = exports.EventParticipantDto = exports.EventListItemDto = exports.AddParticipantDto = exports.CreateEventGroupDto = exports.UpdateEventDto = exports.CreateEventDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateEventDto {
    name;
    description;
    date;
    location;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: false, type: () => String }, date: { required: true, type: () => String }, location: { required: false, type: () => String } };
    }
}
exports.CreateEventDto = CreateEventDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "location", void 0);
class UpdateEventDto {
    name;
    description;
    date;
    location;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, description: { required: false, type: () => String }, date: { required: false, type: () => String }, location: { required: false, type: () => String } };
    }
}
exports.UpdateEventDto = UpdateEventDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "location", void 0);
class CreateEventGroupDto {
    name;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String } };
    }
}
exports.CreateEventGroupDto = CreateEventGroupDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventGroupDto.prototype, "name", void 0);
class AddParticipantDto {
    studentId;
    teacherId;
    groupId;
    static _OPENAPI_METADATA_FACTORY() {
        return { studentId: { required: false, type: () => String }, teacherId: { required: false, type: () => String }, groupId: { required: false, type: () => String } };
    }
}
exports.AddParticipantDto = AddParticipantDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddParticipantDto.prototype, "studentId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddParticipantDto.prototype, "teacherId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddParticipantDto.prototype, "groupId", void 0);
class EventListItemDto {
    id;
    name;
    description;
    date;
    location;
    participantCount;
    groupCount;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true }, date: { required: true, type: () => String }, location: { required: true, type: () => String, nullable: true }, participantCount: { required: true, type: () => Number }, groupCount: { required: true, type: () => Number } };
    }
}
exports.EventListItemDto = EventListItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EventListItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EventListItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], EventListItemDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EventListItemDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], EventListItemDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], EventListItemDto.prototype, "participantCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], EventListItemDto.prototype, "groupCount", void 0);
class EventParticipantDto {
    id;
    studentId;
    teacherId;
    groupId;
    name;
    kind;
    photoUrl;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, studentId: { required: true, type: () => String, nullable: true }, teacherId: { required: true, type: () => String, nullable: true }, groupId: { required: true, type: () => String, nullable: true }, name: { required: true, type: () => String }, kind: { required: true, type: () => String }, photoUrl: { required: true, type: () => String, nullable: true } };
    }
}
exports.EventParticipantDto = EventParticipantDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EventParticipantDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], EventParticipantDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], EventParticipantDto.prototype, "teacherId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], EventParticipantDto.prototype, "groupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EventParticipantDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EventParticipantDto.prototype, "kind", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], EventParticipantDto.prototype, "photoUrl", void 0);
class EventGroupDto {
    id;
    name;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String } };
    }
}
exports.EventGroupDto = EventGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EventGroupDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EventGroupDto.prototype, "name", void 0);
class EventDetailDto {
    id;
    name;
    description;
    date;
    location;
    groups;
    participants;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true }, date: { required: true, type: () => String }, location: { required: true, type: () => String, nullable: true }, groups: { required: true, type: () => [require("./event.dto").EventGroupDto] }, participants: { required: true, type: () => [require("./event.dto").EventParticipantDto] } };
    }
}
exports.EventDetailDto = EventDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EventDetailDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EventDetailDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], EventDetailDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EventDetailDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], EventDetailDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [EventGroupDto] }),
    __metadata("design:type", Array)
], EventDetailDto.prototype, "groups", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [EventParticipantDto] }),
    __metadata("design:type", Array)
], EventDetailDto.prototype, "participants", void 0);
//# sourceMappingURL=event.dto.js.map