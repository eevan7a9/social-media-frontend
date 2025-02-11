import type { User } from './User';

export interface Group {
  image: string;
  title: string;
  desc: string;
}

export interface GroupDetails extends Group {
  members: User[];
}
