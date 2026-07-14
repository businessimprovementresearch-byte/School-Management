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
exports.SessionDetailResponseDto = exports.SessionFeedbackDto = exports.SessionTeacherAttendanceDto = exports.SessionStudentDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class SessionStudentDto {
    id;
    name;
    photoFileId;
    photoUrl;
    attendanceStatus;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, photoFileId: { required: true, type: () => String, nullable: true }, photoUrl: { required: true, type: () => String, nullable: true }, attendanceStatus: { required: true, type: () => String, nullable: true } };
    }
}
exports.SessionStudentDto = SessionStudentDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SessionStudentDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SessionStudentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], SessionStudentDto.prototype, "photoFileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], SessionStudentDto.prototype, "photoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], SessionStudentDto.prototype, "attendanceStatus", void 0);
class SessionTeacherAttendanceDto {
    teacherId;
    teacherName;
    status;
    static _OPENAPI_METADATA_FACTORY() {
        return { teacherId: { required: true, type: () => String }, teacherName: { required: true, type: () => String }, status: { required: true, type: () => String, nullable: true } };
    }
}
exports.SessionTeacherAttendanceDto = SessionTeacherAttendanceDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SessionTeacherAttendanceDto.prototype, "teacherId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SessionTeacherAttendanceDto.prototype, "teacherName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], SessionTeacherAttendanceDto.prototype, "status", void 0);
class SessionFeedbackDto {
    id;
    teacherName;
    content;
    type;
    studentId;
    studentName;
    createdAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, teacherName: { required: true, type: () => String }, content: { required: true, type: () => String }, type: { required: true, type: () => String }, studentId: { required: true, type: () => String, nullable: true }, studentName: { required: true, type: () => String, nullable: true }, createdAt: { required: true, type: () => String } };
    }
}
exports.SessionFeedbackDto = SessionFeedbackDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SessionFeedbackDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SessionFeedbackDto.prototype, "teacherName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SessionFeedbackDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SessionFeedbackDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], SessionFeedbackDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], SessionFeedbackDto.prototype, "studentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SessionFeedbackDto.prototype, "createdAt", void 0);
class SessionDetailResponseDto {
    id;
    classId;
    className;
    classGrade;
    date;
    academicYearId;
    academicYearName;
    termId;
    termName;
    attendanceSubmitted;
    students;
    teacherAttendance;
    feedback;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, classId: { required: true, type: () => String }, className: { required: true, type: () => String }, classGrade: { required: true, type: () => String }, date: { required: true, type: () => String }, academicYearId: { required: true, type: () => String }, academicYearName: { required: true, type: () => String }, termId: { required: true, type: () => String, nullable: true }, termName: { required: true, type: () => String, nullable: true }, attendanceSubmitted: { required: true, type: () => Boolean }, students: { required: true, type: () => [require("./session-detail-response.dto").SessionStudentDto] }, teacherAttendance: { required: true, type: () => [require("./session-detail-response.dto").SessionTeacherAttendanceDto] }, feedback: { required: true, type: () => [require("./session-detail-response.dto").SessionFeedbackDto] } };
    }
}
exports.SessionDetailResponseDto = SessionDetailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SessionDetailResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SessionDetailResponseDto.prototype, "classId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SessionDetailResponseDto.prototype, "className", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SessionDetailResponseDto.prototype, "classGrade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SessionDetailResponseDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SessionDetailResponseDto.prototype, "academicYearId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SessionDetailResponseDto.prototype, "academicYearName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], SessionDetailResponseDto.prototype, "termId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], SessionDetailResponseDto.prototype, "termName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], SessionDetailResponseDto.prototype, "attendanceSubmitted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [SessionStudentDto] }),
    __metadata("design:type", Array)
], SessionDetailResponseDto.prototype, "students", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [SessionTeacherAttendanceDto] }),
    __metadata("design:type", Array)
], SessionDetailResponseDto.prototype, "teacherAttendance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [SessionFeedbackDto] }),
    __metadata("design:type", Array)
], SessionDetailResponseDto.prototype, "feedback", void 0);
//# sourceMappingURL=session-detail-response.dto.js.map