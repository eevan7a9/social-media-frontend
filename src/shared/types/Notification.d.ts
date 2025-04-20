import type { NotificationTarget, NotificationType } from '../enums/Notification';

export interface AppNotification {
  title: string;
  desc: string;
  type: NotificationType;
  id: string;
  unread: boolean;
  image?: string;
  created?: string | Date;
  target: NotificationTarget;
  targetId: string;
  data?: unknown;
}
