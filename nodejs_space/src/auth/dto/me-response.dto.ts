import { ApiProperty } from '@nestjs/swagger';
import { UserInfoDto } from './login-response.dto';

export class MeResponseDto {
  @ApiProperty({ type: () => UserInfoDto }) user: UserInfoDto;
}
