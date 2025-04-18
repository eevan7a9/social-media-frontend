import type { ActivityItem } from '@/shared/types/Activity';

import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';
export const useActivitiesStore = defineStore('activities', () => {
  const state = reactive<{ activities: ActivityItem[]; loading: boolean; initialFetchDone: boolean }>({
    activities: [],
    loading: false,
    initialFetchDone: false,
  });

  const list = computed(() => state.activities);
  const initialFetchDone = computed(() => state.initialFetchDone);
  const loading = computed(() => state.loading);

  function setActivities(activities: ActivityItem[]) {
    state.activities = activities;
  }
  function setInitialFetchDone(val: boolean) {
    state.initialFetchDone = val;
  }

  return {
    list,
    initialFetchDone,
    loading,
    setInitialFetchDone,
    setActivities,
  };
});
