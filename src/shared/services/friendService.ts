import axios from 'axios';
import type { UserFriend } from '../types/User';

const url = import.meta.env.VITE_APP_FRIENDS_URL || import.meta.env.VITE_APP_BASE_URL + '/friends';

export async function fetchFriends(): Promise<{ friends: UserFriend[] }> {
  const res = await axios.get(url);
  return { friends: res.data };
}
