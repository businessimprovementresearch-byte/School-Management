import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { CreateEventDto, UpdateEventDto, AddParticipantDto } from './dto/event.dto';
export declare class EventsService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    findAll(): Promise<{
        id: string;
        name: string;
        description: string | null;
        date: string;
        location: string | null;
        participantCount: number;
        groupCount: number;
    }[]>;
    create(dto: CreateEventDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        date: string;
        location: string | null;
        participantCount: number;
        groupCount: number;
    }>;
    update(id: string, dto: UpdateEventDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        date: string;
        location: string | null;
        participantCount: number;
        groupCount: number;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        date: string;
        location: string | null;
        groups: {
            id: string;
            name: string;
        }[];
        participants: {
            id: string;
            studentId: string | null;
            teacherId: string | null;
            groupId: string | null;
            name: string;
            kind: string;
            photoUrl: string | null;
        }[];
    }>;
    createGroup(eventId: string, name: string): Promise<{
        id: string;
        name: string;
    }>;
    removeGroup(groupId: string): Promise<{
        success: boolean;
    }>;
    addParticipant(eventId: string, dto: AddParticipantDto): Promise<{
        success: boolean;
    }>;
    removeParticipant(participantId: string): Promise<{
        success: boolean;
    }>;
}
