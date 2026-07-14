import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateEventDto, UpdateEventDto, CreateEventGroupDto, AddParticipantDto, EventListItemDto, EventDetailDto, EventGroupDto } from './dto/event.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';

@ApiTags('Events')
@Controller('api/events')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EventsController {
  constructor(private service: EventsService) {}

  @Get()
  async findAll(): Promise<EventListItemDto[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EventDetailDto> {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('ADMIN')
  async create(@Body() dto: CreateEventDto): Promise<EventListItemDto> {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles('ADMIN')
  async update(@Param('id') id: string, @Body() dto: UpdateEventDto): Promise<EventListItemDto> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async remove(@Param('id') id: string): Promise<SuccessResponseDto> {
    return this.service.remove(id);
  }

  @Post(':id/groups')
  @Roles('ADMIN')
  async createGroup(@Param('id') id: string, @Body() dto: CreateEventGroupDto): Promise<EventGroupDto> {
    return this.service.createGroup(id, dto.name);
  }

  @Delete('groups/:groupId')
  @Roles('ADMIN')
  async removeGroup(@Param('groupId') groupId: string): Promise<SuccessResponseDto> {
    return this.service.removeGroup(groupId);
  }

  @Post(':id/participants')
  @Roles('ADMIN')
  async addParticipant(@Param('id') id: string, @Body() dto: AddParticipantDto): Promise<SuccessResponseDto> {
    return this.service.addParticipant(id, dto);
  }

  @Delete('participants/:participantId')
  @Roles('ADMIN')
  async removeParticipant(@Param('participantId') participantId: string): Promise<SuccessResponseDto> {
    return this.service.removeParticipant(participantId);
  }
}
