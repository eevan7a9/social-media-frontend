import type { Group } from '@/shared/types/Group';
import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

const url = import.meta.env.VITE_APP_GROUPS_URL || import.meta.env.VITE_APP_BASE_URL + '/groups';

export const useGroupsStore = defineStore('groups', () => {
  const state = reactive<{ groups: Group[]; loading: boolean; initialFetchDone: boolean }>({
    groups: [],
    loading: false,
    initialFetchDone: false,
  });

  const initialFetchDone = computed(() => state.initialFetchDone);
  const list = computed(() => state.groups);
  const loading = computed(() => state.loading);

  async function fetchGroups(): Promise<{ groups: Group[] }> {
    const res = await axios.get(url);
    return { groups: res.data };
  }
  function setInitialFetchDone(val: boolean) {
    state.initialFetchDone = val;
  }
  function setLoading(val: boolean): void {
    state.loading = val;
  }
  function setGroups(groups: Group[]): void {
    state.groups = groups;
  }

  return {
    list,
    loading,
    initialFetchDone,
    fetchGroups,
    setLoading,
    setGroups,
    setInitialFetchDone,
  };
});
