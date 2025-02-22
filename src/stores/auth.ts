import type { AuthUser } from '@/shared/types/User';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const state = reactive<{ user: AuthUser | undefined }>({
    user: {
      id: 'id1',
      username: 'Eevan7a9',
      email: 'Eevan7a9@gmail.com',
      password: 'secret',
      image: 'https://ik.imagekit.io/wr5lnrww0q8/Portfolio_3/assets/avata_Gbnx-bplm.webp',
    },
  });

  const authUser = computed<AuthUser | undefined>(() => state.user);

  return {
    authUser,
  };
});
