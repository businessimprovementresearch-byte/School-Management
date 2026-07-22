import { IsBoolean } from 'class-validator';

export class SetSessionHolidayDto {
  @IsBoolean()
  isHoliday: boolean;
}
