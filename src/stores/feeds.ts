import type { Post, PostComment } from '@/shared/types/Post';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

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

  function addPost(post: Post) {
    if (!post) return;
    state.feeds.unshift(post);
  }
  function removePost(id: string) {
    state.feeds = state.feeds.filter((feed) => feed.id !== id);
  }
  function likeFeed(id: string | number) {
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
    if (!id) return;
    const feed = state.feeds.find((item) => item.id === id);
    if (feed) {
      feed.hasSaved = !feed.hasSaved;
    }
  }
  function addComment(postId: string, comment: PostComment) {
    const feed = state.feeds.find((item) => item.id === postId);
    if (!feed) return;
    feed.comments.push(comment);
  }
  function removeComment(postId: string, commentId: string) {
    if (!postId || !commentId) return;
    const post = state.feeds.find((feed) => feed.id === postId);
    if (!post) return;
    post.comments = post.comments.filter((comment) => comment.id !== commentId);
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
    likeFeed,
    saveFeed,
    shareFeed,
    addComment,
    addPost,
    removePost,
    removeComment,
  };
});
