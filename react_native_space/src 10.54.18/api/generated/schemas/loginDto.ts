// @ts-nocheck

export interface LoginDto {
  email: string;
  /** @minLength 1 */
  password: string;
}
