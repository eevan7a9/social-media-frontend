import axios from 'axios';
import type { ChatMessage, ChatRoom } from '../types/Chat';
import type { User } from '../types/User';

const url = import.meta.env.VITE_APP_ROOMS_URL || import.meta.env.VITE_APP_BASE_URL + '/rooms';

export async function fetchChatRooms(): Promise<ChatRoom[]> {
  const res = await axios.get<ChatRoom[]>(url);
  return res.data;
}

export async function createChatRoom(profile: User, token: string): Promise<ChatRoom> {
  /**
   * Server Request
   */
  console.log(profile, token);
  const res = {};
  return res as ChatRoom;
}

export async function createChatMessage(
  roomId: string,
  message: string,
  token: string,
): Promise<ChatMessage> {
  console.log(roomId, message, token);
  /**
   * Server Request
   */
  const res = {};
  return res as ChatMessage;
}
