import type { UserFriend } from '@/shared/types/User';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

export const useFriendsStore = defineStore('friends', () => {
  const state = reactive<{ friends: UserFriend[]; loading: boolean; initialFetchDone: boolean }>({
    friends: [],
    loading: false,
    initialFetchDone: false,
  });

  const list = computed(() => state.friends);
  const initialFetchDone = computed(() => state.initialFetchDone);
  const loading = computed(() => state.loading);

  function setFriends(friends: UserFriend[]) {
    state.friends = friends;
  }
  function setInitialFetchDone(val: boolean) {
    state.initialFetchDone = val;
  }

  return {
    list,
    initialFetchDone,
    loading,
    setInitialFetchDone,
    setFriends,
  };
});
