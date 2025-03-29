import type { UserAuth } from '@/shared/types/User';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const state = reactive<{ user: UserAuth | undefined }>({
    user: {
      id: 'me719',
      username: 'Eevan7a9',
      email: 'Eevan7a9@gmail.com',
      token: 'secret',
      groups: ['G3', 'G5'],
      country: 'Philippines',
      city: 'Hidden Leaf Village',
      image: 'https://ik.imagekit.io/wr5lnrww0q8/Portfolio_3/assets/avata_Gbnx-bplm.webp',
    },
  });

  const authUser = computed<UserAuth | undefined>(() => state.user);

  return {
    authUser,
  };
});
