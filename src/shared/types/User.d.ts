import type { FriendStatus } from '../enums/User';

export interface User {
  id: string;
  username: string;
  email: string;
  country: string;
  city: string;
  verified?: boolean;
  image?: string;
  imageConver?: string;
  groups?: string[];
  connections?: string[];
  occupation?: string;
  company?: string;
  website?: string;
  connected?: boolean;
  socials?: {
    github?: string;
    twitter?: string;
    youtube?: string;
    facebook?: string;
    instagram?: string;
    twitch?: string;
  };
}

export interface UserFriend extends User {
  status?: FriendStatus;
}

export interface UserAuth extends User {
  token: string;
}
export interface UserSimilar extends User {
  pending?: boolean
}
