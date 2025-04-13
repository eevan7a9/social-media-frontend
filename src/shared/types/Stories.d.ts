import type { StoryReaction } from '../enums/Story';

export interface Reactions {
  [key in StoryReaction]: number;
}

export interface StoryAuthor {
  id: string;
  name: string;
  image?: string;
}

export interface Story {
  id: string;
  content: string;
  image: string;
  author: StoryAuthor;
  reactions: Partial<Record<StoryReaction, number>>;
  myReaction?: StoryReaction;
  views?: number;
  created?: string | Date;
}
