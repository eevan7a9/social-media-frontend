import type { User } from './User';

export interface Group {
  id: string;
  name: string;
  desc: string;
  image?: string;
  imageCover?: string;
  postsId?: string[];
  membersId?: string[];
}

export interface GroupDetails extends Group {
  members: User[];
}
