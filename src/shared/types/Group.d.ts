import type { User } from './User';

export interface Group {
  id: string;
  image: string;
  title: string;
  desc: string;
}

export interface GroupDetails extends Group {
  members: User[];
}
