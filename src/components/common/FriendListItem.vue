<script lang="ts" setup>
import { FriendStatus } from '@/shared/enums/Friend';
import type { UserFriend } from '@/shared/types/User';
import { IconVerticalDots } from '../icons';
import { useRouter } from 'vue-router';

const props = defineProps<{ friend: UserFriend }>();

const router = useRouter();

function viewProfile() {
  router.push({ path: '/profile', query: { user: props.friend.id } });
}
</script>

<template>
  <li class="flex items-center gap-x-3">
    <div class="relative">
      <span
        class="h-2 w-2 absolute z-10 bottom-1 right-1 rounded-full"
        :class="{
          'bg-success': friend.status === FriendStatus.Active,
          'bg-warning': friend.status === FriendStatus.Inactive,
          'bg-danger': friend.status === FriendStatus.Offline,
        }"
      ></span>
      <img :src="friend.image" @click="viewProfile" class="cursor-pointer w-[50px] h-[50px] rounded-full" />
    </div>
    <span class="text-[14px] hover:underline cursor-pointer" @click="viewProfile">{{ friend.username }}</span>

    <button class="absolute group right-4 hover:bg-slate-200/50 p-3 rounded-full cursor-pointer">
      <IconVerticalDots class="w-[20px] opacity-60 group-hover:opacity-100" fill="#333" />
    </button>
  </li>
</template>
