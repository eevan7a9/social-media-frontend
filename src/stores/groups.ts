import type { Group } from '@/shared/types/Group';

import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

export const useGroupsStore = defineStore('groups', () => {
  const state = reactive<{ groups: Group[]; loading: boolean; initialFetchDone: boolean }>({
    groups: [],
    loading: false,
    initialFetchDone: false,
  });

  const initialFetchDone = computed(() => state.initialFetchDone);
  const list = computed(() => state.groups);
  const loading = computed(() => state.loading);

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
    setLoading,
    setGroups,
    setInitialFetchDone,
  };
});
