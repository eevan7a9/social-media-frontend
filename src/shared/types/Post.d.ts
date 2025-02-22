import type { PostTypes } from '../enums/Post';

export interface PostActions {
  like: number;
  share: number;
}

export interface PostComment {
  id: string;
  content: string;
  actions?: PostActions;
  image?: string;
  created?: string | Date;
  updated?: string | Date;
  author?: PostAuthor;
}

export interface PostAuthor {
  id: string;
  name: string;
  image?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  type: PostTypes;
  comments: PostComment[];
  actions: PostActions;
  author: PostAuthor;
  image?: string;
  tags?: string[];
  link?: string;
  latlng?: [number, number];
  created: string | Date;
  updated?: string | Date;
  hasLiked?: boolean;
  hasShared?: boolean;
  hasSaved?: boolean;
}
