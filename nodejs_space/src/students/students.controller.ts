import {
  Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req,
  ParseIntPipe, DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
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

@ApiTags('Students')
@Controller('api')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentsController {
  constructor(
    private studentsService: StudentsService,
    private prisma: PrismaService,
  ) {}

  private async getTeacherClassIds(req: Request): Promise<string[] | undefined> {
    const user = req.user as { userId: string; role: string };
    if (user.role === 'TEACHER') {
      const teacher = await this.prisma.teacher.findUnique({
        where: { userId: user.userId },
        include: { assignments: true },
      });
      return teacher?.assignments?.map((a) => a.classId) ?? [];
    }
    return undefined;
  }

  @Get('students')
  async findAll(
    @Req() req: Request,
    @Query('search') search?: string,
    @Query('classId') classId?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit?: number,
  ): Promise<StudentListResponseDto> {
    const teacherClassIds = await this.getTeacherClassIds(req);
    return this.studentsService.findAll(search, classId, page, limit, teacherClassIds);
  }

  @Get('students/:id')
  async findOne(@Param('id') id: string): Promise<StudentDetailResponseDto> {
    return this.studentsService.findOne(id);
  }

  @Post('students')
  @Roles('ADMIN')
  async create(@Body() dto: CreateStudentDto): Promise<StudentDetailResponseDto> {
    return this.studentsService.create(dto);
  }

  @Patch('students/:id')
  @Roles('ADMIN')
  async update(@Param('id') id: string, @Body() dto: UpdateStudentDto): Promise<StudentDetailResponseDto> {
    return this.studentsService.update(id, dto);
  }

  @Delete('students/:id')
  @Roles('ADMIN')
  async remove(@Param('id') id: string): Promise<SuccessResponseDto> {
    return this.studentsService.remove(id);
  }

  @Post('students/:studentId/enrollments')
  @Roles('ADMIN')
  async addEnrollment(
    @Param('studentId') studentId: string,
    @Body() dto: AddEnrollmentDto,
  ): Promise<EnrollmentResponseDto> {
    return this.studentsService.addEnrollment(studentId, dto.classId, dto.academicYearId);
  }

  @Patch('enrollments/:id')
  @Roles('ADMIN')
  async updateEnrollment(
    @Param('id') id: string,
    @Body() dto: UpdateEnrollmentDto,
  ): Promise<UpdateEnrollmentResponseDto> {
    return this.studentsService.updateEnrollment(id, dto.status);
  }

  @Delete('enrollments/:id')
  @Roles('ADMIN')
  async deleteEnrollment(@Param('id') id: string): Promise<SuccessResponseDto> {
    return this.studentsService.deleteEnrollment(id);
  }

  @Post('students/:studentId/history')
  @Roles('ADMIN')
  async addClassHistory(
    @Param('studentId') studentId: string,
    @Body() dto: AddClassHistoryDto,
  ): Promise<ClassHistoryResponseDto> {
    return this.studentsService.addClassHistory(studentId, dto.classId, dto.academicYearId, dto.action);
  }
}
