export declare class CreateEventDto {
    name: string;
    description?: string;
    date: string;
    location?: string;
}
export declare class UpdateEventDto {
    name?: string;
    description?: string;
    date?: string;
    location?: string;
}
export declare class CreateEventGroupDto {
    name: string;
}
export declare class AddParticipantDto {
    studentId?: string;
    teacherId?: string;
    groupId?: string;
}
export declare class EventListItemDto {
    id: string;
    name: string;
    description: string | null;
    date: string;
    location: string | null;
    participantCount: number;
    groupCount: number;
}
export declare class EventParticipantDto {
    id: string;
    studentId: string | null;
    teacherId: string | null;
    groupId: string | null;
    name: string;
    kind: string;
    photoUrl: string | null;
}
export declare class EventGroupDto {
    id: string;
    name: string;
}
export declare class EventDetailDto {
    id: string;
    name: string;
    description: string | null;
    date: string;
    location: string | null;
    groups: EventGroupDto[];
    participants: EventParticipantDto[];
}
