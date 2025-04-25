import type { UserAuth } from '@/shared/types/User';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

interface UserStoreState {
  user: UserAuth | undefined;
}

export const useAuthStore = defineStore('auth', () => {
  const state = reactive<UserStoreState>({
    user: {
      id: 'me719',
      username: 'Eevan7a9',
      email: 'Eevan7a9@gmail.com',
      token: 'secret',
      groups: ['G3', 'G5'],
      country: 'Philippines',
      connections: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8'],
      city: 'Hidden Leaf Village',
      image: 'https://ik.imagekit.io/wr5lnrww0q8/Portfolio_3/assets/avata_Gbnx-bplm.webp',
    },
  });

  const authUser = computed<UserAuth | undefined>(() => state.user);

  function removeConnection(id: string) {
    if (state.user?.connections) {
      state.user.connections = state.user?.connections?.filter((i) => i != id);
    }
  }

  return {
    authUser,
    removeConnection,
  };
});
