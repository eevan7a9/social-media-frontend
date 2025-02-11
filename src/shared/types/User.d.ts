import type { FriendStatus } from '../enums/Friend';

export interface User {
  id: string;
  username: string;
  email?: string;
  image?: string;
}

export interface UserFriend extends User {
  status?: FriendStatus;
}

export interface UserCurrent extends User {
  password: string;
}
