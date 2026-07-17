import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AwardsService } from './awards.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateAwardDto, IssueAwardDto, UpdateAwardDto, AwardListItemDto, AwardIssuanceDto } from './dto/award.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';

@ApiTags('Awards')
@Controller('api/awards')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AwardsController {
  constructor(private service: AwardsService) {}

  @Get()
  async findAll(): Promise<AwardListItemDto[]> {
    return this.service.findAll();
  }

  @Get('issuances')
  async findIssuances(
    @Query('studentId') studentId?: string,
    @Query('teacherId') teacherId?: string,
  ): Promise<AwardIssuanceDto[]> {
    return this.service.findIssuances(studentId, teacherId);
  }

  @Post()
  @Roles('ADMIN')
  async create(@Body() dto: CreateAwardDto): Promise<AwardListItemDto> {
    return this.service.create(dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async remove(@Param('id') id: string): Promise<SuccessResponseDto> {
    return this.service.remove(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  async update(@Param('id') id: string, @Body() dto: UpdateAwardDto): Promise<AwardListItemDto> {
    return this.service.update(id, dto);
  }

  @Post('issue')
  @Roles('ADMIN')
  async issue(@Body() dto: IssueAwardDto): Promise<SuccessResponseDto> {
    return this.service.issue(dto);
  }

  @Delete('issuances/:id')
  @Roles('ADMIN')
  async removeIssuance(@Param('id') id: string): Promise<SuccessResponseDto> {
    return this.service.removeIssuance(id);
  }
}