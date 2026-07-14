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
exports.ClassesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const classes_service_1 = require("./classes.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const assign_teacher_dto_1 = require("./dto/assign-teacher.dto");
const prisma_service_1 = require("../prisma/prisma.service");
let ClassesController = class ClassesController {
    classesService;
    prisma;
    constructor(classesService, prisma) {
        this.classesService = classesService;
        this.prisma = prisma;
    }
    async findAll(req) {
        const user = req.user;
        let teacherClassIds;
        if (user.role === 'TEACHER') {
            const teacher = await this.prisma.teacher.findUnique({
                where: { userId: user.userId },
                include: { assignments: true },
            });
            teacherClassIds = teacher?.assignments?.map((a) => a.classId) ?? [];
        }
        return this.classesService.findAll(teacherClassIds);
    }
    async findOne(id) {
        return this.classesService.findOne(id);
    }
    async assignTeacher(classId, dto) {
        return this.classesService.assignTeacher(classId, dto.teacherId);
    }
    async removeTeacher(classId, teacherId) {
        return this.classesService.removeTeacher(classId, teacherId);
    }
};
exports.ClassesController = ClassesController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./dto/class-list-response.dto").ClassListItemDto] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/class-detail-response.dto").ClassDetailResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':classId/teachers'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    openapi.ApiResponse({ status: 201, type: require("./dto/teacher-assignment-response.dto").TeacherAssignmentResponseDto }),
    __param(0, (0, common_1.Param)('classId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_teacher_dto_1.AssignTeacherDto]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "assignTeacher", null);
__decorate([
    (0, common_1.Delete)(':classId/teachers/:teacherId'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    openapi.ApiResponse({ status: 200, type: require("../common/dto/success-response.dto").SuccessResponseDto }),
    __param(0, (0, common_1.Param)('classId')),
    __param(1, (0, common_1.Param)('teacherId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "removeTeacher", null);
exports.ClassesController = ClassesController = __decorate([
    (0, swagger_1.ApiTags)('Classes'),
    (0, common_1.Controller)('api/classes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [classes_service_1.ClassesService,
        prisma_service_1.PrismaService])
], ClassesController);
//# sourceMappingURL=classes.controller.js.map