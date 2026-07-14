import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsString() name: string;
  @IsString() @IsOptional() description?: string;
  @IsDateString() date: string;
  @IsString() @IsOptional() location?: string;
}

export class UpdateEventDto {
  @IsString() @IsOptional() name?: string;
  @IsString() @IsOptional() description?: string;
  @IsDateString() @IsOptional() date?: string;
  @IsString() @IsOptional() location?: string;
}

export class CreateEventGroupDto {
  @IsString() name: string;
}

export class AddParticipantDto {
  @IsString() @IsOptional() studentId?: string;
  @IsString() @IsOptional() teacherId?: string;
  @IsString() @IsOptional() groupId?: string;
}

export class EventListItemDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty({ nullable: true }) description: string | null;
  @ApiProperty() date: string;
  @ApiProperty({ nullable: true }) location: string | null;
  @ApiProperty() participantCount: number;
  @ApiProperty() groupCount: number;
}

export class EventParticipantDto {
  @ApiProperty() id: string;
  @ApiProperty({ nullable: true }) studentId: string | null;
  @ApiProperty({ nullable: true }) teacherId: string | null;
  @ApiProperty({ nullable: true }) groupId: string | null;
  @ApiProperty() name: string;
  @ApiProperty() kind: string;
  @ApiProperty({ nullable: true }) photoUrl: string | null;
}

export class EventGroupDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
}

export class EventDetailDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty({ nullable: true }) description: string | null;
  @ApiProperty() date: string;
  @ApiProperty({ nullable: true }) location: string | null;
  @ApiProperty({ type: () => [EventGroupDto] }) groups: EventGroupDto[];
  @ApiProperty({ type: () => [EventParticipantDto] }) participants: EventParticipantDto[];
}
