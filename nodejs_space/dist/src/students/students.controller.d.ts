import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AddEnrollmentDto } from './dto/add-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { AddClassHistoryDto } from './dto/add-class-history.dto';
import { StudentListResponseDto } from './dto/student-list-response.dto';
import { StudentDetailResponseDto } from './dto/student-detail-response.dto';
import { EnrollmentResponseDto, UpdateEnrollmentResponseDto } from './dto/enrollment-response.dto';
import { ClassHistoryResponseDto } from './dto/class-history-response.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';
import { PrismaService } from '../prisma/prisma.service';
import type { Request } from 'express';
export declare class StudentsController {
    private studentsService;
    private prisma;
    constructor(studentsService: StudentsService, prisma: PrismaService);
    private getTeacherClassIds;
    findAll(req: Request, search?: string, classId?: string, page?: number, limit?: number): Promise<StudentListResponseDto>;
    findOne(id: string): Promise<StudentDetailResponseDto>;
    create(dto: CreateStudentDto): Promise<StudentDetailResponseDto>;
    update(id: string, dto: UpdateStudentDto): Promise<StudentDetailResponseDto>;
    remove(id: string): Promise<SuccessResponseDto>;
    addEnrollment(studentId: string, dto: AddEnrollmentDto): Promise<EnrollmentResponseDto>;
    updateEnrollment(id: string, dto: UpdateEnrollmentDto): Promise<UpdateEnrollmentResponseDto>;
    deleteEnrollment(id: string): Promise<SuccessResponseDto>;
    addClassHistory(studentId: string, dto: AddClassHistoryDto): Promise<ClassHistoryResponseDto>;
}
