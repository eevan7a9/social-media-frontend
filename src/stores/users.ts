import type { User, UserFriend } from '@/shared/types/User';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

interface UsersStoreState {
  users: UserFriend[];
  loading: boolean;
  initialFetchDone: boolean;
}

export const useUsersStore = defineStore('users', () => {
  const state = reactive<UsersStoreState>({
    users: [],
    loading: false,
    initialFetchDone: false,
  });

  const list = computed(() => state.users);
  const friends = computed(() => state.users.filter((user) => user.connected));
  const initialFetchDone = computed(() => state.initialFetchDone);
  const loading = computed(() => state.loading);

  function setUsers(users: User[]) {
    state.users = users;
  }
  function setInitialFetchDone(val: boolean) {
    state.initialFetchDone = val;
  }
  function removeUserConnection(id: string) {
    const foundUser = state.users.find((user) => user.id === id);
    if (foundUser) {
      foundUser.connected = false;
      foundUser.connections = foundUser.connections?.filter((i) => i !== id);
    }
  }

  return {
    list,
    initialFetchDone,
    loading,
    friends,
    removeUserConnection,
    setInitialFetchDone,
    setUsers,
  };
});
