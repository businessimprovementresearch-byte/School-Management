import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsBoolean, IsString, IsOptional, Min } from 'class-validator';

export class NotificationDto {
  @ApiProperty() id: string;
  @ApiProperty({ nullable: true }) teacherId: string | null;
  @ApiProperty() title: string;
  @ApiProperty() body: string;
  @ApiProperty() type: string;
  @ApiProperty() read: boolean;
  @ApiProperty() createdAt: string;
}

export class UnreadCountDto {
  @ApiProperty() count: number;
}

export class AlertSettingDto {
  @ApiProperty() teacherId: string;
  @ApiProperty() teacherName: string;
  @ApiProperty() delayMinutes: number;
  @ApiProperty() enabled: boolean;
  @ApiProperty() channel: string;
}

export class UpdateAlertSettingDto {
  @IsInt() @Min(0) @IsOptional() delayMinutes?: number;
  @IsBoolean() @IsOptional() enabled?: boolean;
  @IsString() @IsOptional() channel?: string;
}

export class CheckAlertsResultDto {
  @ApiProperty() created: number;
  @ApiProperty() checkedSessions: number;
}
