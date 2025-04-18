import { StoryReaction } from '@/shared/enums/Story';
import type { Story } from '@/shared/types/Stories';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

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

  function setStories(stories: Story[]) {
    state.stories = stories;
  }

  function setInitialFetchDone(val: boolean) {
    state.initialFetchDone = val;
  }

  function setStoryReaction(id: string, reaction: StoryReaction) {
    const story = state.stories.find((item) => item.id === id);
    if (!story) return;
    if (story.myReaction && story.myReaction === reaction) {
      story.reactions[reaction] = Math.max((story.reactions[reaction] ?? 0) - 1, 0);
      story.myReaction = undefined;
      return;
    }

    if (story.myReaction) {
      story.reactions[story.myReaction] = (story.reactions[story.myReaction] ?? 1) - 1;
    }
    story.myReaction = reaction;
    story.reactions[reaction] = (story.reactions[reaction] ?? 0) + 1;
  }

  return {
    list,
    topStories,
    initialFetchDone,
    loading,
    setInitialFetchDone,
    setStories,
    setStoryReaction,
  };
});
