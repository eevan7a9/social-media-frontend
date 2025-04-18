import axios from 'axios';
import type { Story } from '../types/Stories';

const url = import.meta.env.VITE_APP_STORIES_URL || import.meta.env.VITE_APP_BASE_URL + '/stories';

export async function fetchStories(): Promise<{ stories: Story[] }> {
  const res = await axios.get(url);
  return { stories: res.data };
}
