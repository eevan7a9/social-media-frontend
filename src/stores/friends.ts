import type { UserFriend } from '@/shared/types/User';
import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

const url = import.meta.env.VITE_APP_FRIENDS_URL || import.meta.env.VITE_APP_BASE_URL + '/friends';

export const useFriendsStore = defineStore('friends', () => {
  const state = reactive<{ friends: UserFriend[]; loading: boolean; initialFetchDone: boolean }>({
    friends: [],
    loading: false,
    initialFetchDone: false,
  });

  const list = computed(() => state.friends);
  const initialFetchDone = computed(() => state.initialFetchDone);
  const loading = computed(() => state.loading);

  async function fetchFriends(): Promise<{ friends: UserFriend[] }> {
    state.loading = true;
    const res = await axios.get(url);
    state.loading = false;
    return { friends: res.data };
  }

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
    fetchFriends,
    setInitialFetchDone,
    setFriends,
  };
});
