import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TeachersService } from './teachers.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeacherListItemDto } from './dto/teacher-list-response.dto';
import { TeacherDetailResponseDto } from './dto/teacher-detail-response.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';

@ApiTags('Teachers')
@Controller('api/teachers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @Get()
  @Roles('ADMIN')
  async findAll(): Promise<TeacherListItemDto[]> {
    return this.teachersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TeacherDetailResponseDto> {
    return this.teachersService.findOne(id);
  }

  @Post()
  @Roles('ADMIN')
  async create(@Body() dto: CreateTeacherDto): Promise<TeacherDetailResponseDto> {
    return this.teachersService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTeacherDto): Promise<TeacherDetailResponseDto> {
    return this.teachersService.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async remove(@Param('id') id: string): Promise<SuccessResponseDto> {
    return this.teachersService.remove(id);
  }
}
