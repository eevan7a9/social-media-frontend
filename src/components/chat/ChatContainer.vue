<script lang="ts" setup>
import { useChatStore } from '@/stores/chat';

import ChatRoom from './ChatRoom.vue';
const chatStore = useChatStore();
</script>

<template>
  <div class="overflow-visible w-full pointer-events-none">
    <div class="relative overflow-visible w-auto max-w-screen-lg mx-auto">
      <!-- ChatWidgets -->
      <ul class="flex items-end gap-3 pl-3 md:pl-6">
        <li v-for="room of chatStore.visibleRooms" :key="room.id">
          <ChatRoom @close="chatStore.removeRoomVisibility" :chatRoom="room" class="pointer-events-auto" />
        </li>
      </ul>
    </div>
  </div>
</template>
