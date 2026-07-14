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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const students_service_1 = require("./students.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const create_student_dto_1 = require("./dto/create-student.dto");
const update_student_dto_1 = require("./dto/update-student.dto");
const add_enrollment_dto_1 = require("./dto/add-enrollment.dto");
const update_enrollment_dto_1 = require("./dto/update-enrollment.dto");
const add_class_history_dto_1 = require("./dto/add-class-history.dto");
const prisma_service_1 = require("../prisma/prisma.service");
let StudentsController = class StudentsController {
    studentsService;
    prisma;
    constructor(studentsService, prisma) {
        this.studentsService = studentsService;
        this.prisma = prisma;
    }
    async getTeacherClassIds(req) {
        const user = req.user;
        if (user.role === 'TEACHER') {
            const teacher = await this.prisma.teacher.findUnique({
                where: { userId: user.userId },
                include: { assignments: true },
            });
            return teacher?.assignments?.map((a) => a.classId) ?? [];
        }
        return undefined;
    }
    async findAll(req, search, classId, page, limit) {
        const teacherClassIds = await this.getTeacherClassIds(req);
        return this.studentsService.findAll(search, classId, page, limit, teacherClassIds);
    }
    async findOne(id) {
        return this.studentsService.findOne(id);
    }
    async create(dto) {
        return this.studentsService.create(dto);
    }
    async update(id, dto) {
        return this.studentsService.update(id, dto);
    }
    async remove(id) {
        return this.studentsService.remove(id);
    }
    async addEnrollment(studentId, dto) {
        return this.studentsService.addEnrollment(studentId, dto.classId);
    }
    async updateEnrollment(id, dto) {
        return this.studentsService.updateEnrollment(id, dto.status);
    }
    async deleteEnrollment(id) {
        return this.studentsService.deleteEnrollment(id);
    }
    async addClassHistory(studentId, dto) {
        return this.studentsService.addClassHistory(studentId, dto.classId, dto.academicYearId, dto.action);
    }
};
exports.StudentsController = StudentsController;
__decorate([
    openapi.ApiQuery({ name: "search", required: false }),
    openapi.ApiQuery({ name: "classId", required: false }),
    openapi.ApiQuery({ name: "page", required: false }),
    openapi.ApiQuery({ name: "limit", required: false }),
    (0, common_1.Get)('students'),
    openapi.ApiResponse({ status: 200, type: require("./dto/student-list-response.dto").StudentListResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('classId')),
    __param(3, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(4, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('students/:id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/student-detail-response.dto").StudentDetailResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('students'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    openapi.ApiResponse({ status: 201, type: require("./dto/student-detail-response.dto").StudentDetailResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('students/:id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    openapi.ApiResponse({ status: 200, type: require("./dto/student-detail-response.dto").StudentDetailResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_student_dto_1.UpdateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('students/:id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    openapi.ApiResponse({ status: 200, type: require("../common/dto/success-response.dto").SuccessResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('students/:studentId/enrollments'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    openapi.ApiResponse({ status: 201, type: require("./dto/enrollment-response.dto").EnrollmentResponseDto }),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_enrollment_dto_1.AddEnrollmentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "addEnrollment", null);
__decorate([
    (0, common_1.Patch)('enrollments/:id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    openapi.ApiResponse({ status: 200, type: require("./dto/enrollment-response.dto").UpdateEnrollmentResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_enrollment_dto_1.UpdateEnrollmentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "updateEnrollment", null);
__decorate([
    (0, common_1.Delete)('enrollments/:id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    openapi.ApiResponse({ status: 200, type: require("../common/dto/success-response.dto").SuccessResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "deleteEnrollment", null);
__decorate([
    (0, common_1.Post)('students/:studentId/history'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    openapi.ApiResponse({ status: 201, type: require("./dto/class-history-response.dto").ClassHistoryResponseDto }),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_class_history_dto_1.AddClassHistoryDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "addClassHistory", null);
exports.StudentsController = StudentsController = __decorate([
    (0, swagger_1.ApiTags)('Students'),
    (0, common_1.Controller)('api'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [students_service_1.StudentsService,
        prisma_service_1.PrismaService])
], StudentsController);
//# sourceMappingURL=students.controller.js.map