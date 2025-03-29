<script lang="ts" setup>
import type { UserSimilar } from '@/shared/types/User';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import ButtonConnection from '../common/buttons/ButtonConnection.vue';
import { IconPeople } from '../icons';
import { useRouter } from 'vue-router';
import { useAlert } from '@/composables/alert';
import { AlertType } from '@/shared/enums/Alert';

const url = import.meta.env.VITE_APP_SIMILAR_USERS || import.meta.env.VITE_APP_BASE_URL + '/users-similar';

const router = useRouter();
const alert = useAlert();

const users = ref<UserSimilar[]>([]);

function viewProfile(id: string) {
  router.push({ path: '/profile', query: { user: id } });
}

function addUser(user: UserSimilar) {
  user.connected = !user.connected;
  if (user.connected) {
    alert.showAlert(`You added ${user.username.slice(0, 10)}...`, AlertType.Info);
  }
}

onMounted(async () => {
  const res = await axios.get<UserSimilar[]>(url);
  users.value = res.data;
});
</script>

<template>
  <div class="bg-white dark:bg-black py-3 lg:py-5">
    <h1 class="flex items-center text-[16px] md:text-[20px] font-semibold pb-3 px-3 lg:px-5 xl:px-8">
      Similar profile
      <IconPeople class="ml-3 w-[35px] fill-primary" />
    </h1>

    <ul class="flex flex-col">
      <li class="flex items-center px-3 lg:px-5 py-3" v-for="user of users" :key="user.id">
        <img
          @click="viewProfile(user.id)"
          :src="user.image"
          class="cursor-pointer w-[60px] h-[60px] rounded-full"
        />

        <div class="flex flex-col ml-3 cursor-pointer" @click="viewProfile(user.id)">
          <h4 class="text-[16px] md:text-[18px] hover:underline">
            {{ user.username }}
          </h4>
          <span class="font-light text-[12px] md:text-[14px]">
            {{ user.occupation }} | {{ user.company }}
          </span>
        </div>

        <ButtonConnection
          label-not-connected="Add"
          @click="addUser(user)"
          :is-connected="user.connected"
          class="ml-auto mr-0"
        />
      </li>
    </ul>
  </div>
</template>
