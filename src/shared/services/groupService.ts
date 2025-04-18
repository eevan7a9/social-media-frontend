import axios from 'axios';
import type { Group } from '../types/Group';
const url = import.meta.env.VITE_APP_GROUPS_URL || import.meta.env.VITE_APP_BASE_URL + '/groups';

export async function fetchGroups(): Promise<{ groups: Group[] }> {
  const res = await axios.get(url);
  return { groups: res.data };
}
