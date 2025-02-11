import type { ActivityItem } from '@/shared/types/Activity';
import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

const url = import.meta.env.VITE_APP_ACTIVITIES_URL || import.meta.env.VITE_APP_BASE_URL + '/activities';

export const useActivitiesStore = defineStore('activities', () => {
  const state = reactive<{ activities: ActivityItem[]; loading: boolean; initialFetchDone: boolean }>({
    activities: [],
    loading: false,
    initialFetchDone: false,
  });

  const list = computed(() => state.activities);
  const initialFetchDone = computed(() => state.initialFetchDone);
  const loading = computed(() => state.loading);

  async function fetchActivities(): Promise<{ activities: ActivityItem[] }> {
    state.loading = true;
    const res = await axios.get(url);
    state.loading = false;
    return { activities: res.data };
  }

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
    fetchActivities,
    setInitialFetchDone,
    setActivities,
  };
});
