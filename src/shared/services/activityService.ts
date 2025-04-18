import axios from 'axios';
import type { ActivityItem } from '../types/Activity';

const url = import.meta.env.VITE_APP_ACTIVITIES_URL || import.meta.env.VITE_APP_BASE_URL + '/activities';

export async function fetchActivities(): Promise<{ activities: ActivityItem[] }> {
  const res = await axios.get(url);
  return { activities: res.data };
}
