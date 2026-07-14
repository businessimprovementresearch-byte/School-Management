import { ClassesService } from './classes.service';
import { ClassListItemDto } from './dto/class-list-response.dto';
import { ClassDetailResponseDto } from './dto/class-detail-response.dto';
import { AssignTeacherDto } from './dto/assign-teacher.dto';
import { TeacherAssignmentResponseDto } from './dto/teacher-assignment-response.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';
import { PrismaService } from '../prisma/prisma.service';
import type { Request } from 'express';
export declare class ClassesController {
    private classesService;
    private prisma;
    constructor(classesService: ClassesService, prisma: PrismaService);
    findAll(req: Request): Promise<ClassListItemDto[]>;
    findOne(id: string): Promise<ClassDetailResponseDto>;
    assignTeacher(classId: string, dto: AssignTeacherDto): Promise<TeacherAssignmentResponseDto>;
    removeTeacher(classId: string, teacherId: string): Promise<SuccessResponseDto>;
}
