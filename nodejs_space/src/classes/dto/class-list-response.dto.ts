import { ApiProperty } from '@nestjs/swagger';

export class ClassTeacherDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty({ nullable: true, type: String }) photoFileId: string | null;
  @ApiProperty({ nullable: true, type: String }) photoUrl: string | null;
}

export class ClassListItemDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() grade: string;
  @ApiProperty({ nullable: true, type: String }) description: string | null;
  @ApiProperty() studentCount: number;
  @ApiProperty({ type: () => [ClassTeacherDto] }) teachers: ClassTeacherDto[];
  @ApiProperty({ nullable: true, type: String }) nextSessionDate: string | null;
}
