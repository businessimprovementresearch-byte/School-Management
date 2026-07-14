import { ApiProperty } from '@nestjs/swagger';

export class TeacherClassDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() grade: string;
}

export class TeacherListItemDto {
  @ApiProperty() id: string;
  @ApiProperty() userId: string;
  @ApiProperty() name: string;
  @ApiProperty() dob: string;
  @ApiProperty() age: number;
  @ApiProperty() contactNumber: string;
  @ApiProperty({ nullable: true, type: String }) photoFileId: string | null;
  @ApiProperty({ nullable: true, type: String }) photoUrl: string | null;
  @ApiProperty({ type: () => [TeacherClassDto] }) assignedClasses: TeacherClassDto[];
}
