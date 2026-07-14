import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TermsService } from './terms.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateTermDto } from './dto/create-term.dto';
import { TermResponseDto, TermListItemDto } from './dto/term-response.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';

@ApiTags('Terms')
@Controller('api/terms')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TermsController {
  constructor(private service: TermsService) {}

  @Get()
  async findAll(@Query('academicYearId') academicYearId?: string): Promise<TermListItemDto[]> {
    return this.service.findAll(academicYearId);
  }

  @Post()
  @Roles('ADMIN')
  async create(@Body() dto: CreateTermDto): Promise<TermResponseDto> {
    return this.service.create(dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async remove(@Param('id') id: string): Promise<SuccessResponseDto> {
    return this.service.remove(id);
  }
}
