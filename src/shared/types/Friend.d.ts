import type { FriendStatus } from '../enums/Friend';

export interface FriendItem {
  title: string;
  image: string;
  status: FriendStatus;
}
