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

  const list = computed(() => state.feeds);
  const loading = computed(() => state.loading);

  async function fetchFeeds(): Promise<{ posts: Post[] }> {
    const posts = await axios.get<Post[]>(url);
    return { posts: posts.data };
  }

  function likeFeed(id: string | number) {
    /**
     * Server Request
     */
    const feed = state.feeds.find((item) => item.id === id);
    if (!feed) return;
    feed.hasLiked = !feed.hasLiked;
    if (feed.hasLiked) {
      feed.actions.like++;
    } else {
      feed.actions.like--;
    }
  }
  function shareFeed(id: string | number) {
    /**
     * Server Request
     */
    const feed = state.feeds.find((item) => item.id === id);
    if (!feed) return;
    feed.hasShared = !feed.hasShared;
    if (feed.hasShared) {
      feed.actions.share++;
    } else {
      feed.actions.share--;
    }
  }
  function saveFeed(id: string | number) {
    /**
     * Server Request
     */
    if (!id) return;
    const feed = state.feeds.find((item) => item.id === id);
    if (feed) {
      feed.hasSaved = !feed.hasSaved;
    }
  }
  function addComment(postId: string | number, comment: { content: string; img?: string }) {
    /**
     * Server Request
     */
    console.log(comment);
    const feed = state.feeds.find((item) => item.id === postId);
    if (!feed) return;

    const date = new Date();
    feed.comments.push({
      id: 'c' + date.getTime(),
      content: comment.content,
      created: date,
      author: {
        id: 'id1',
        name: 'Eevan7a9',
        image: 'https://ik.imagekit.io/wr5lnrww0q8/Portfolio_3/assets/avata_Gbnx-bplm.webp',
      },
    });
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
    list,
    loading,
    clearState,
    setLoading,
    setFeeds,
    fetchFeeds,
    likeFeed,
    saveFeed,
    shareFeed,
    addComment,
  };
});
