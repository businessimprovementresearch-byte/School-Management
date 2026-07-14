// @ts-nocheck
import type { EventGroupDto } from './eventGroupDto';
import type { EventParticipantDto } from './eventParticipantDto';

export interface EventDetailDto {
  id: string;
  name: string;
  /** @nullable */
  description: string | null;
  date: string;
  /** @nullable */
  location: string | null;
  groups: EventGroupDto[];
  participants: EventParticipantDto[];
}
