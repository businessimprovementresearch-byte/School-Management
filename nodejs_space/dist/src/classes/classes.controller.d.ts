import { ClassesService } from './classes.service';
import { ClassListItemDto } from './dto/class-list-response.dto';
import { ClassDetailResponseDto } from './dto/class-detail-response.dto';
import { AssignTeacherDto } from './dto/assign-teacher.dto';
import { CreateClassDto } from './dto/create-class.dto';
import { TeacherAssignmentResponseDto } from './dto/teacher-assignment-response.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';
import { PrismaService } from '../prisma/prisma.service';
import type { Request } from 'express';
import { UpdateClassDto } from './dto/update-class.dto';
export declare class ClassesController {
    private classesService;
    private prisma;
    constructor(classesService: ClassesService, prisma: PrismaService);
    findAll(req: Request): Promise<ClassListItemDto[]>;
    findOne(id: string, academicYearId?: string): Promise<ClassDetailResponseDto>;
    assignTeacher(classId: string, dto: AssignTeacherDto): Promise<TeacherAssignmentResponseDto>;
    update(classId: string, dto: UpdateClassDto): Promise<ClassDetailResponseDto>;
    removeTeacher(classId: string, teacherId: string): Promise<SuccessResponseDto>;
    setYearStatus(classId: string, academicYearId: string, dto: {
        isActive: boolean;
    }): Promise<{
        id: string;
        isActive: boolean;
        classId: string;
        academicYearId: string;
    }>;
    create(dto: CreateClassDto): Promise<ClassDetailResponseDto>;
    remove(classId: string): Promise<SuccessResponseDto>;
}
