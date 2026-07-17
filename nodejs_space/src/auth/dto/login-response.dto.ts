import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDto {
  @ApiProperty() id: string;
  @ApiProperty() email: string;
  @ApiProperty() name: string;
  @ApiProperty() role: string;
  @ApiProperty({ nullable: true, type: String }) teacherId: string | null;
}

export class LoginResponseDto {
  @ApiProperty() token: string;
  @ApiProperty({ type: () => UserInfoDto }) user: UserInfoDto;
}
