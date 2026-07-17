// @ts-nocheck

export interface UpdateAlertSettingDto {
  /** @minimum 0 */
  delayMinutes?: number;
  enabled?: boolean;
  channel?: string;
}
