<script lang="ts" setup>
import type { User } from '@/shared/types/User';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import GroupMembersItem from './GroupMembersItem.vue';

const url = import.meta.env.VITE_APP_USERS || import.meta.env.VITE_APP_BASE_URL + '/users';

const props = defineProps<{ membersId: string[] }>();

const users = ref<User[]>([]);

onMounted(() => {
  axios.get<User[]>(url).then((res) => {
    users.value = res.data.filter((user) => props.membersId.includes(user.id));
  });
});
</script>

<template>
  <section class="h-full flex flex-col">
    <div class="bg-white dark:bg-black py-3 px-1 sm:px-3 md:px-5">
      <h1 class="sm:text-[18px] font-medium">Members ({{ users.length }})</h1>
    </div>

    <div class="custom-scrollbar relative h-full overflow-y-auto">
      <ul class="flex flex-col gap-2 md:py-3 px-3 pb-[80px]" @click.stop>
        <template v-for="(user, i) of users" :key="i">
          <GroupMembersItem :user="user" />
        </template>
      </ul>
    </div>

    <div class="h-[50px] w-full bg-white dark:bg-black"></div>
  </section>
</template>
