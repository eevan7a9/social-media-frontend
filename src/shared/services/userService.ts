import axios from 'axios';
import type { User, UserFriend } from '../types/User';

const urlFriends = import.meta.env.VITE_APP_FRIENDS_URL || import.meta.env.VITE_APP_BASE_URL + '/friends';
const urlUsers = import.meta.env.VITE_APP_USERS || import.meta.env.VITE_APP_BASE_URL + '/users';

export async function fetchFriends(): Promise<{ friends: UserFriend[] }> {
  const res = await axios.get(urlFriends);
  return { friends: res.data };
}

export async function fetchUsers(): Promise<{ users: User[] }> {
  const res = await axios.get(urlUsers);
  return { users: res.data };
}

export async function addFriends(id: string, token: string): Promise<{ friend: UserFriend }> {
  console.log(id, token);
  /**
   * Server Request
   */
  const res = {} as UserFriend;
  return { friend: res };
}

export async function removeFriends(id: string, token: string): Promise<boolean> {
  console.log(id, token);
  /**
   * Server Request
   */
  return true;
}
