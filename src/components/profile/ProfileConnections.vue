<script setup lang="ts">
import type { User } from '@/shared/types/User';
import FriendListItem from '../common/FriendListItem.vue';

const props = defineProps<{ connections: User[] }>();
</script>

<template>
  <div class="bg-white mt-3 md:mt-5 py-3 md:py-5 px-3 md:px-5 rounded-md">
    <h1 class="text-[16px] md:text-[20px] font-bold">Connections:</h1>
    <ul class="flex flex-col gap-y-3 mt-2 lg:mt-3 max-h-[500px] overflow-auto relative">
      <FriendListItem v-for="friend of props.connections" :key="friend.id" :friend="friend" />
    </ul>
  </div>
</template>
