import type { ChatStatus } from '../enums/Chat';

export interface ChatMessage {
  id: string;
  roomId: string;
  content: string;
  status: ChatStatus;
  created: string | Date;
  senderId: string;
  image?: string;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  created: string | Date;
  recentMessage?: {
    senderName: string;
    senderId: string;
    content: string;
  };
  title?: string;
  unreads?: number;
  image?: string;
}
