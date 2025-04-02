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
  content: string;
  type: PostTypes;
  comments: PostComment[];
  actions: PostActions;
  author: PostAuthor;
  group?: {
    id: string;
    name: string;
  };
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

const posts: Post[] = [
  {
    id: 'g05p01',
    content: 'Do you know why? How do you know How? What??? 🤯🤯🤯',
    type: 'text',
    comments: [],
    actions: {
      like: 4,
      share: 1,
    },
    author: {
      id: 'f6',
      name: 'Vivi Blue',
      image: 'https://placehold.co/100x100/0e4281/FFF',
    },
    group: {
      id: 'G5',
      name: 'Tech & Science',
    },
    tags: ['Physics', 'Sand', 'Death', 'Glass Broken', 'SandTime'],
    hasLiked: true,
    hasSaved: true,
    created: '12/25/2024, 4: 32: 37 PM',
  },
  {
    id: 'g05p02',
    content:
      '😵‍💫🥸 Man doesn’t have the ability to recognize an objective reality. He “designs” his own reality in the mind. Distinguished between radical constructivism and Erlanger constructivism.',
    type: 'text',
    comments: [],
    actions: {
      like: 4,
      share: 1,
    },
    author: {
      id: 'f1',
      image: 'https://placehold.co/100x100/808000/fff',
      name: 'John Doe III',
    },
    group: {
      id: 'G5',
      name: 'Tech & Science',
    },
    tags: ['Physics', 'Sand', 'Death', 'Glass Broken', 'SandTime'],
    hasLiked: true,
    hasSaved: true,
    created: '12/13/2024, 4: 32: 37 PM',
  },
];

console.log(posts);
