// @ts-nocheck
import type { UserInfoDto } from './userInfoDto';

export interface LoginResponseDto {
  token: string;
  user: UserInfoDto;
}
