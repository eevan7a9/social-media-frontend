<script lang="ts" setup>
import type { ChatMessage } from '@/shared/types/Chat';
import { useAuthStore } from '@/stores/auth';
import { nextTick, onMounted, ref, watch } from 'vue';

const authStore = useAuthStore();
const props = defineProps<{ messages: ChatMessage[] }>();

const chatContainer = ref<HTMLElement | null>(null);

function scrollBottom() {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value?.scrollHeight;
  }
}

watch(
  () => props.messages.length,
  () => nextTick().then(() => scrollBottom())
);

onMounted(async () => {
  await nextTick();
  scrollBottom();
});
</script>

<template>
  <ul ref="chatContainer" class="grow relative overflow-y-auto px-1 md:px-2 flex flex-col gap-2 pt-2">
    <li class="relative pt-5 pb-3" v-for="message of props.messages" :key="message.id">
      <div
        class="chat-message"
        :class="message.senderId === authStore.authUser?.id ? 'right dark:!bg-sky-700' : 'left !bg-gray-500'"
      >
        <span
          :class="{
            'text-[24px]': message.content.length <= 4,
            'text-[20px]': message.content.length <= 10,
            'text-[16px]': message.content.length > 10,
          }"
        >
          {{ message.content }}
        </span>
      </div>

      <span
        :class="message.senderId === authStore.authUser?.id ? 'right-0 mr-8' : 'left-0 ml-8'"
        class="absolute top-0 text-[12px] text-gray-700 dark:text-gray-400"
      >
        {{ message.created }}
      </span>
    </li>
  </ul>
</template>

<style lang="css" scoped>
.chat-message {
  max-width: 300px;
  padding: 1em;
  border-inline: 20px solid #0000;
  border-radius: calc(20px + 20px) / 20px;
  mask:
    radial-gradient(100% 100% at var(--_p) 0, #0000 99%, #000 102%) var(--_p) 100% / 20px 20px no-repeat,
    linear-gradient(#000 0 0) padding-box;
  background: #1763b9;
  color: #fff;
}

.left {
  --_p: 0;
  border-bottom-left-radius: 0 0;
  place-self: start;
}
.right {
  --_p: 100%;
  border-bottom-right-radius: 0 0;
  place-self: end;
}
</style>
