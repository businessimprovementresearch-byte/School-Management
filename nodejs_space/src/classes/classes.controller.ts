import { Controller, Get, Post, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClassesService } from './classes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ClassListItemDto } from './dto/class-list-response.dto';
import { ClassDetailResponseDto } from './dto/class-detail-response.dto';
import { AssignTeacherDto } from './dto/assign-teacher.dto';
import { TeacherAssignmentResponseDto } from './dto/teacher-assignment-response.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';
import { PrismaService } from '../prisma/prisma.service';
import type { Request } from 'express';

@ApiTags('Classes')
@Controller('api/classes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClassesController {
  constructor(
    private classesService: ClassesService,
    private prisma: PrismaService,
  ) {}

  @Get()
  async findAll(@Req() req: Request): Promise<ClassListItemDto[]> {
    const user = req.user as { userId: string; role: string };
    let teacherClassIds: string[] | undefined;
    if (user.role === 'TEACHER') {
      const teacher = await this.prisma.teacher.findUnique({
        where: { userId: user.userId },
        include: { assignments: true },
      });
      teacherClassIds = teacher?.assignments?.map((a) => a.classId) ?? [];
    }
    return this.classesService.findAll(teacherClassIds);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ClassDetailResponseDto> {
    return this.classesService.findOne(id);
  }

  @Post(':classId/teachers')
  @Roles('ADMIN')
  async assignTeacher(
    @Param('classId') classId: string,
    @Body() dto: AssignTeacherDto,
  ): Promise<TeacherAssignmentResponseDto> {
    return this.classesService.assignTeacher(classId, dto.teacherId, dto.academicYearId);
  }

  @Delete(':classId/teachers/:teacherId')
  @Roles('ADMIN')
  async removeTeacher(
    @Param('classId') classId: string,
    @Param('teacherId') teacherId: string,
  ): Promise<SuccessResponseDto> {
    return this.classesService.removeTeacher(classId, teacherId);
  }
}
