import { ApiProperty } from '@nestjs/swagger';

export class EnrolledClassDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() grade: string;
}

export class StudentListItemDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty({ nullable: true, type: String }) nickname: string | null;
  @ApiProperty({ nullable: true, type: String }) parentName: string | null;
  @ApiProperty({ nullable: true, type: String }) dob: string | null;
  @ApiProperty({ nullable: true, type: Number }) age: number | null;
  @ApiProperty({ nullable: true, type: String }) contactNumber: string | null;
  @ApiProperty({ nullable: true, type: String }) photoFileId: string | null;
  @ApiProperty({ nullable: true, type: String }) photoUrl: string | null;
  @ApiProperty({ type: () => [EnrolledClassDto] }) enrolledClasses: EnrolledClassDto[];
}

export class StudentListResponseDto {
  @ApiProperty({ type: () => [StudentListItemDto] }) items: StudentListItemDto[];
  @ApiProperty() total: number;
  @ApiProperty() page: number;
  @ApiProperty() totalPages: number;
}
