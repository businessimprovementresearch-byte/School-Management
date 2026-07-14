import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateAwardDto {
  @IsString() name: string;
  @IsString() @IsOptional() description?: string;
  @IsString() @IsOptional() icon?: string;
}

export class IssueAwardDto {
  @IsString() awardId: string;
  @IsString() @IsOptional() studentId?: string;
  @IsString() @IsOptional() teacherId?: string;
  @IsString() @IsOptional() note?: string;
}

export class AwardListItemDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty({ nullable: true }) description: string | null;
  @ApiProperty({ nullable: true }) icon: string | null;
  @ApiProperty() issuedCount: number;
}

export class AwardIssuanceDto {
  @ApiProperty() id: string;
  @ApiProperty() awardId: string;
  @ApiProperty() awardName: string;
  @ApiProperty({ nullable: true }) awardIcon: string | null;
  @ApiProperty({ nullable: true }) note: string | null;
  @ApiProperty() issuedAt: string;
  @ApiProperty() recipientName: string;
  @ApiProperty() recipientKind: string;
  @ApiProperty({ nullable: true }) studentId: string | null;
  @ApiProperty({ nullable: true }) teacherId: string | null;
  @ApiProperty({ nullable: true }) photoUrl: string | null;
}
