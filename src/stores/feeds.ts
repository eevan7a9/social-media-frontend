import type { Post } from '@/shared/types/Post';
import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

const url = import.meta.env.VITE_APP_POSTS_URL || import.meta.env.VITE_APP_BASE_URL + '/posts';

export const useFeedsStore = defineStore('feeds', () => {
  const state = reactive<{
    feeds: Post[];
    loading: boolean;
  }>({
    feeds: [],
    loading: false,
  });

  const lists = computed(() => state.feeds);
  const loading = computed(() => state.loading);

  async function fetchFeeds(): Promise<{ posts: Post[] }> {
    const posts = await axios.get<Post[]>(url);
    return { posts: posts.data };
  }
  function setLoading(val: boolean): void {
    state.loading = val;
  }
  function setFeeds(posts: Post[]): void {
    state.feeds = posts;
  }
  function clearState(): void {
    state.feeds = [];
  }
  return {
    lists,
    loading,
    clearState,
    setLoading,
    setFeeds,
    fetchFeeds,
  };
});
