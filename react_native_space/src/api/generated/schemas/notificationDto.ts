// @ts-nocheck

export interface NotificationDto {
  id: string;
  /** @nullable */
  teacherId: string | null;
  title: string;
  body: string;
  type: string;
  read: boolean;
  createdAt: string;
}
