import type { ActivityTarget } from '../enums/Activity';

export interface ActivityAuthor {
  id: string;
  name: string;
  image?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  desc: string;
  target: ActivityTarget;
  targetId: string;
  author: ActivityAuthor;
  created?: string;
  image?: string;
}
