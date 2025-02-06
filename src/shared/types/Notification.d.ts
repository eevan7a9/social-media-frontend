import type { NotificationType } from '../enums/Notification';

export interface AppNotification {
  title: string;
  desc: string;
  type: NotificationType;
  id: string;
  image?: string;
  created?: string | Date;
  data?: unknown;
}
