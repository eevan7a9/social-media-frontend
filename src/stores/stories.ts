import type { Story } from '@/shared/types/Stories';
import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

const url = import.meta.env.VITE_APP_STORIES_URL || import.meta.env.VITE_APP_BASE_URL + '/stories';

export const useStoriesStore = defineStore('stories', () => {
  const state = reactive<{ stories: Story[]; loading: boolean; initialFetchDone: boolean }>({
    stories: [],
    loading: false,
    initialFetchDone: false,
  });

  const list = computed(() => state.stories);
  const topStories = computed(() => state.stories.slice(0, 2));
  const initialFetchDone = computed(() => state.initialFetchDone);
  const loading = computed(() => state.loading);

  async function fetchStories(): Promise<{ stories: Story[] }> {
    state.loading = true;
    const res = await axios.get(url);
    state.loading = false;
    return { stories: res.data };
  }

  function setStories(stories: Story[]) {
    state.stories = stories;
  }
  function setInitialFetchDone(val: boolean) {
    state.initialFetchDone = val;
  }

  return {
    list,
    topStories,
    initialFetchDone,
    loading,
    fetchStories,
    setInitialFetchDone,
    setStories,
  };
});
