<script lang="ts" setup>
import { FriendStatus } from '@/shared/enums/User';
import type { UserFriend } from '@/shared/types/User';
import { IconFlag } from '../icons';
import { useRouter } from 'vue-router';
import MenuMore from './menu/MenuMore.vue';
import { ref } from 'vue';
import { useReport } from '@/composables/report';

const report = useReport();

const props = defineProps<{ friend: UserFriend }>();
const menuMore = ref<InstanceType<typeof MenuMore> | null>(null);
const router = useRouter();

function viewProfile() {
  router.push({ path: '/profile', query: { user: props.friend.id } });
}

function reportUser() {
  report.user(props.friend.id);
  menuMore.value?.close();
}
</script>

<template>
  <li class="flex items-center gap-x-3">
    <div class="relative">
      <span
        class="border border-white size-[10px] absolute z-10 bottom-1 right-0 rounded-full"
        :class="{
          'bg-success': friend.status === FriendStatus.Active,
          'bg-warning': friend.status === FriendStatus.Inactive,
          'bg-danger': friend.status === FriendStatus.Offline,
        }"
      ></span>
      <img :src="friend.image" @click="viewProfile" class="cursor-pointer w-[50px] h-[50px] rounded-full" />
    </div>
    <span class="text-[14px] hover:underline cursor-pointer" @click="viewProfile">{{ friend.username }}</span>

    <MenuMore
      ref="menuMore"
      vertical
      class="ml-auto py-0 mr-0 fill-gray-500 hover:fill-gray-800 dark:hover:fill-gray-200"
    >
      <ul class="bg-white dark:bg-black py-1 flex flex-col text-[14px] z-50">
        <li
          class="flex items-center p-2 hover:bg-slate-200 dark:hover:bg-slate-600"
          @click="() => reportUser()"
        >
          <IconFlag class="w-[30px] mr-2" />

          <span>Report</span>
        </li>
      </ul>
    </MenuMore>
  </li>
</template>
