<script lang="ts" setup>
import { ref } from 'vue';
import ButtonDefault from '../common/buttons/ButtonDefault.vue';
import { IconEmoji, IconSend } from '../icons';
import { useAuthStore } from '@/stores/auth';
import { createChatMessage } from '@/shared/services/chatService';
import type { ChatMessage } from '@/shared/types/Chat';
import EmojiPicker from '../common/popups/EmojiPicker.vue';

const authStore = useAuthStore();

const props = defineProps<{ roomId: string }>();
const emits = defineEmits<{ newMessage: [message: ChatMessage] }>();
const message = ref('');

function submit() {
  if (!message.value || !authStore.authUser) return;
  createChatMessage(props.roomId, message.value, authStore.authUser.token).then((res) => {
    emits('newMessage', res as ChatMessage);
    message.value = '';
  });
}
</script>

<template>
  <form @submit.prevent="submit" class="relative justify-stretch pb-2">
    <div class="right-0 h-full w-full flex items-center relative border border-slate-300 bg-slate-100">
      <textarea
        class="z-0 placeholder:text-[18px] lg:py-1 resize-none font-light px-3 w-full"
        :class="{
          'lg:text-[20px]': message.length < 10,
          'text-[18px]': message.length < 30,
          'text-[14px]': message.length > 31,
        }"
        name="chat-message-input"
        placeholder="My message...(Max:100 Char)"
        rows="2"
        v-model="message"
        @keydown.enter="submit()"
        maxlength="100"
      />

      <EmojiPicker
        popup-class="bottom-12"
        class="absolute top-0 right-0"
        @select="(e) => (message = message + e)"
      >
        <template #button="emojiPickerScope">
          <button
            type="button"
            @click="emojiPickerScope.togglePopup()"
            class="flex items-center gap-1 group p-1 cursor-pointer"
          >
            <IconEmoji
              class="lg:group-hover:scale-150 transition-all duration-300 ease-in-out rounded-full bg-warning/15 p-1 h-[35px] w-[35px] fill-warning/70 hover:fill-warning"
            />
          </button>
        </template>
      </EmojiPicker>
    </div>
    <ButtonDefault type="submit" class="px-3  font-medium text-[14px]">
      <IconSend class="w-[24px] fill-white" />
    </ButtonDefault>
  </form>
</template>
