import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AcademicYearsService } from './academic-years.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';
import { AcademicYearResponseDto, AcademicYearListItemDto } from './dto/academic-year-response.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';
import { RolloverAcademicYearDto } from './dto/rollover-academic-year.dto';

@ApiTags('Academic Years')
@Controller('api/academic-years')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AcademicYearsController {
  constructor(private service: AcademicYearsService) {}

  @Get()
  async findAll(): Promise<AcademicYearListItemDto[]> {
    return this.service.findAll();
  }

  @Post()
  @Roles('ADMIN')
  async create(@Body() dto: CreateAcademicYearDto): Promise<AcademicYearResponseDto> {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('ADMIN')
  async update(@Param('id') id: string, @Body() dto: UpdateAcademicYearDto): Promise<AcademicYearResponseDto> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async remove(@Param('id') id: string): Promise<SuccessResponseDto> {
    return this.service.remove(id);
  }

  @Post(':id/rollover')
  @Roles('ADMIN')
  async rollover(@Param('id') id: string, @Body() dto: RolloverAcademicYearDto) {
    return this.service.rollover(id, dto);
  }
}
