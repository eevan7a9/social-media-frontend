import axios from 'axios';
import type { Post } from '../types/Post';

const url = import.meta.env.VITE_APP_POSTS_URL || import.meta.env.VITE_APP_BASE_URL + '/posts';

export async function fetchFeeds(): Promise<{ posts: Post[] }> {
  const posts = await axios.get<Post[]>(url);
  return { posts: posts.data };
}

export async function createFeedComment(
  postId: string | number,
  comment: { content: string; img?: string },
  token: string,
) {
  /**
   * Server Post Request Here...
   */
  console.log(postId, comment, token);

  const res = {};

  return await res;
}

export async function createFeed(
  form: { content: string; imageUrl?: string; linkUrl?: string; latlng?: [number, number] },
  token: string,
) {
  /**
   * Server Post Request Here...
   */
  console.log(form, token);

  const res = {};

  return await res;
}

export async function deleteFeed(id: string) {
  /**
   * Server Delete Request Here...
   */
  return await id;
}
