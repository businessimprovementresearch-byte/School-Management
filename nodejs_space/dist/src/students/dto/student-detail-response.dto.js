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
exports.StudentDetailResponseDto = exports.ClassHistoryInfoDto = exports.FeedbackInfoDto = exports.ProgressInfoDto = exports.ProgressEntryDto = exports.RecentAttendanceDto = exports.AttendanceSummaryDto = exports.PerClassAttendanceDto = exports.EnrollmentInfoDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class EnrollmentInfoDto {
    id;
    classId;
    className;
    classGrade;
    enrollmentDate;
    status;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, classId: { required: true, type: () => String }, className: { required: true, type: () => String }, classGrade: { required: true, type: () => String }, enrollmentDate: { required: true, type: () => String }, status: { required: true, type: () => String } };
    }
}
exports.EnrollmentInfoDto = EnrollmentInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EnrollmentInfoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EnrollmentInfoDto.prototype, "classId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EnrollmentInfoDto.prototype, "className", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EnrollmentInfoDto.prototype, "classGrade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EnrollmentInfoDto.prototype, "enrollmentDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EnrollmentInfoDto.prototype, "status", void 0);
class PerClassAttendanceDto {
    classId;
    className;
    percentage;
    total;
    present;
    static _OPENAPI_METADATA_FACTORY() {
        return { classId: { required: true, type: () => String }, className: { required: true, type: () => String }, percentage: { required: true, type: () => Number }, total: { required: true, type: () => Number }, present: { required: true, type: () => Number } };
    }
}
exports.PerClassAttendanceDto = PerClassAttendanceDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PerClassAttendanceDto.prototype, "classId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PerClassAttendanceDto.prototype, "className", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PerClassAttendanceDto.prototype, "percentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PerClassAttendanceDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PerClassAttendanceDto.prototype, "present", void 0);
class AttendanceSummaryDto {
    totalSessions;
    present;
    absent;
    late;
    excused;
    percentage;
    perClass;
    static _OPENAPI_METADATA_FACTORY() {
        return { totalSessions: { required: true, type: () => Number }, present: { required: true, type: () => Number }, absent: { required: true, type: () => Number }, late: { required: true, type: () => Number }, excused: { required: true, type: () => Number }, percentage: { required: true, type: () => Number }, perClass: { required: true, type: () => [require("./student-detail-response.dto").PerClassAttendanceDto] } };
    }
}
exports.AttendanceSummaryDto = AttendanceSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AttendanceSummaryDto.prototype, "totalSessions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AttendanceSummaryDto.prototype, "present", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AttendanceSummaryDto.prototype, "absent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AttendanceSummaryDto.prototype, "late", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AttendanceSummaryDto.prototype, "excused", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AttendanceSummaryDto.prototype, "percentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [PerClassAttendanceDto] }),
    __metadata("design:type", Array)
], AttendanceSummaryDto.prototype, "perClass", void 0);
class RecentAttendanceDto {
    date;
    className;
    status;
    static _OPENAPI_METADATA_FACTORY() {
        return { date: { required: true, type: () => String }, className: { required: true, type: () => String }, status: { required: true, type: () => String } };
    }
}
exports.RecentAttendanceDto = RecentAttendanceDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RecentAttendanceDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RecentAttendanceDto.prototype, "className", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RecentAttendanceDto.prototype, "status", void 0);
class ProgressEntryDto {
    date;
    value;
    notes;
    static _OPENAPI_METADATA_FACTORY() {
        return { date: { required: true, type: () => String }, value: { required: true, type: () => Number }, notes: { required: true, type: () => String, nullable: true } };
    }
}
exports.ProgressEntryDto = ProgressEntryDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProgressEntryDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProgressEntryDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], ProgressEntryDto.prototype, "notes", void 0);
class ProgressInfoDto {
    metricId;
    metricName;
    metricType;
    classId;
    className;
    entries;
    static _OPENAPI_METADATA_FACTORY() {
        return { metricId: { required: true, type: () => String }, metricName: { required: true, type: () => String }, metricType: { required: true, type: () => String }, classId: { required: true, type: () => String }, className: { required: true, type: () => String }, entries: { required: true, type: () => [require("./student-detail-response.dto").ProgressEntryDto] } };
    }
}
exports.ProgressInfoDto = ProgressInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProgressInfoDto.prototype, "metricId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProgressInfoDto.prototype, "metricName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProgressInfoDto.prototype, "metricType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProgressInfoDto.prototype, "classId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProgressInfoDto.prototype, "className", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [ProgressEntryDto] }),
    __metadata("design:type", Array)
], ProgressInfoDto.prototype, "entries", void 0);
class FeedbackInfoDto {
    id;
    date;
    className;
    teacherName;
    content;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, date: { required: true, type: () => String }, className: { required: true, type: () => String }, teacherName: { required: true, type: () => String }, content: { required: true, type: () => String } };
    }
}
exports.FeedbackInfoDto = FeedbackInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FeedbackInfoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FeedbackInfoDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FeedbackInfoDto.prototype, "className", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FeedbackInfoDto.prototype, "teacherName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FeedbackInfoDto.prototype, "content", void 0);
class ClassHistoryInfoDto {
    id;
    classId;
    className;
    academicYearName;
    action;
    date;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, classId: { required: true, type: () => String }, className: { required: true, type: () => String }, academicYearName: { required: true, type: () => String }, action: { required: true, type: () => String }, date: { required: true, type: () => String } };
    }
}
exports.ClassHistoryInfoDto = ClassHistoryInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassHistoryInfoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassHistoryInfoDto.prototype, "classId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassHistoryInfoDto.prototype, "className", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassHistoryInfoDto.prototype, "academicYearName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassHistoryInfoDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassHistoryInfoDto.prototype, "date", void 0);
class StudentDetailResponseDto {
    id;
    name;
    parentName;
    dob;
    age;
    contactNumber;
    photoFileId;
    photoUrl;
    enrollments;
    attendanceSummary;
    recentAttendance;
    progress;
    feedback;
    classHistory;
    createdAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, parentName: { required: true, type: () => String }, dob: { required: true, type: () => String }, age: { required: true, type: () => Number }, contactNumber: { required: true, type: () => String }, photoFileId: { required: true, type: () => String, nullable: true }, photoUrl: { required: true, type: () => String, nullable: true }, enrollments: { required: true, type: () => [require("./student-detail-response.dto").EnrollmentInfoDto] }, attendanceSummary: { required: true, type: () => require("./student-detail-response.dto").AttendanceSummaryDto }, recentAttendance: { required: true, type: () => [require("./student-detail-response.dto").RecentAttendanceDto] }, progress: { required: true, type: () => [require("./student-detail-response.dto").ProgressInfoDto] }, feedback: { required: true, type: () => [require("./student-detail-response.dto").FeedbackInfoDto] }, classHistory: { required: true, type: () => [require("./student-detail-response.dto").ClassHistoryInfoDto] }, createdAt: { required: true, type: () => String } };
    }
}
exports.StudentDetailResponseDto = StudentDetailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StudentDetailResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StudentDetailResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StudentDetailResponseDto.prototype, "parentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StudentDetailResponseDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StudentDetailResponseDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StudentDetailResponseDto.prototype, "contactNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], StudentDetailResponseDto.prototype, "photoFileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, type: String }),
    __metadata("design:type", Object)
], StudentDetailResponseDto.prototype, "photoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [EnrollmentInfoDto] }),
    __metadata("design:type", Array)
], StudentDetailResponseDto.prototype, "enrollments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => AttendanceSummaryDto }),
    __metadata("design:type", AttendanceSummaryDto)
], StudentDetailResponseDto.prototype, "attendanceSummary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [RecentAttendanceDto] }),
    __metadata("design:type", Array)
], StudentDetailResponseDto.prototype, "recentAttendance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [ProgressInfoDto] }),
    __metadata("design:type", Array)
], StudentDetailResponseDto.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [FeedbackInfoDto] }),
    __metadata("design:type", Array)
], StudentDetailResponseDto.prototype, "feedback", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [ClassHistoryInfoDto] }),
    __metadata("design:type", Array)
], StudentDetailResponseDto.prototype, "classHistory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StudentDetailResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=student-detail-response.dto.js.map