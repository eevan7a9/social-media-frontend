<script lang="ts" setup>
import { useChatStore } from '@/stores/chat';
import { createChatRoom } from '@/shared/services/chatService';
import { IconChatOutline } from '@/components/icons';
import type { User } from '@/shared/types/User';
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';

const props = defineProps<{ profile: User }>();

const auth = useAuthStore();
const chatStore = useChatStore();

const isConnected = computed<boolean | undefined>(() => {
  if (!auth.authUser) return false;
  return props.profile.connections?.includes(auth.authUser?.id);
});

async function sendMessage() {
  const room = chatStore.rooms.find((room) => room.participants.includes(props.profile.id));

  if (room) {
    chatStore.addRoomVisibility(room.id);
  } else {
    console.log('Create new Room');
    try {
      if (!auth.authUser) return;
      const res = await createChatRoom(props.profile, auth.authUser.token);
      chatStore.addRoom(res);
      chatStore.addRoomVisibility(res.id);
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<template>
  <button
    @click="sendMessage()"
    class="text-[14px] sm:text-[16px] md:text-[18px] border items-center bg-light hover:bg-slate-100 dark:bg-dark dark:hover:bg-slate-800 mt-2 py-1 sm:py-2 pl-3 pr-5 rounded-md flex gap-x-1"
    :class="
      isConnected
        ? 'cursor-pointer  border-primary text-primary'
        : 'cursor-not-allowed border-gray-600 text-gray-600'
    "
    :disabled="!isConnected"
  >
    <IconChatOutline class="w-[20px] sm:w-[28px]" :class="isConnected ? 'fill-primary' : 'fill-gray-600'" />
    Send Message
  </button>
</template>
