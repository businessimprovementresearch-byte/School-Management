import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto, CreateEventGroupDto, AddParticipantDto, EventListItemDto, EventDetailDto, EventGroupDto } from './dto/event.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';
export declare class EventsController {
    private service;
    constructor(service: EventsService);
    findAll(): Promise<EventListItemDto[]>;
    findOne(id: string): Promise<EventDetailDto>;
    create(dto: CreateEventDto): Promise<EventListItemDto>;
    update(id: string, dto: UpdateEventDto): Promise<EventListItemDto>;
    remove(id: string): Promise<SuccessResponseDto>;
    createGroup(id: string, dto: CreateEventGroupDto): Promise<EventGroupDto>;
    removeGroup(groupId: string): Promise<SuccessResponseDto>;
    addParticipant(id: string, dto: AddParticipantDto): Promise<SuccessResponseDto>;
    removeParticipant(participantId: string): Promise<SuccessResponseDto>;
}
