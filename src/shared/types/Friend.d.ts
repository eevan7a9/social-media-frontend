import type { FriendStatus } from '../enums/Friend';

export interface FriendItem {
  id?: string;
  title: string;
  image: string;
  status?: FriendStatus;
}
