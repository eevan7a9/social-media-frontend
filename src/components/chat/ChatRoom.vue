<script lang="ts" setup>
import type { ChatMessage, ChatRoom } from '@/shared/types/Chat';
import type { UserFriend } from '@/shared/types/User';
import { useAuthStore } from '@/stores/auth';
import { useFriendsStore } from '@/stores/friends';
import { computed, onMounted, ref, watch } from 'vue';
import { IconChevronUp, IconClose } from '../icons';
import { FriendStatus } from '@/shared/enums/Friend';
import ChatInputForm from './ChatInputForm.vue';
import axios from 'axios';
import ChatMessages from './ChatMessages.vue';
import { useChatStore } from '@/stores/chat';
import { ChatStatus } from '@/shared/enums/Chat';

const url = import.meta.env.VITE_APP_ROOM_MESSAGES_URL || import.meta.env.VITE_APP_BASE_URL + '/messages/';

const chatStore = useChatStore();
const authStore = useAuthStore();
const friendsStore = useFriendsStore();

const emits = defineEmits<{ close: [id: string] }>();
const props = defineProps<{ chatRoom: ChatRoom }>();

const messages = ref<ChatMessage[]>([]);
const participants = ref<UserFriend[]>([]);
const show = ref(true);

const unreads = computed(() => messages.value.filter((msg) => msg.status === ChatStatus.Unread).length);

function clearUnreads() {
  messages.value = messages.value.map((msg) => {
    msg.status = ChatStatus.Read;
    return msg;
  });
}

function setParticipants() {
  participants.value = friendsStore.list.filter(
    (friend) => friend.id !== authStore.authUser?.id && props.chatRoom.participants.includes(friend.id),
  );
}

function insertMessage(message: ChatMessage) {
  messages.value.push(message);
}

async function getRoomMessages() {
  try {
    const res = await axios.get<ChatMessage[]>(url + '/' + props.chatRoom.id + '.json');
    if (typeof res.data === 'object') {
      messages.value = res.data;
    }
  } catch (err) {
    if (err) return [];
  }
}

watch(
  () => friendsStore.list.length,
  () => {
    setParticipants();
  },
);

onMounted(() => {
  /**
   * Server Requests
   */
  getRoomMessages();
  setParticipants();
  setTimeout(() => {
    chatStore.clearRoomUnread(props.chatRoom.id);
    clearUnreads();
  }, 3500);
});
</script>

<template>
  <div
    :class="show ? 'h-[380px] lg:h-[520px] border-slate-200' : 'h-[54px]  border-slate-300'"
    class="border transition-all duration-300 ease-in-out bg-slate-100 dark:bg-slate-700 w-[360px] md:w-[450px] shadow-2xl flex flex-col rounded-t-xl"
  >
    <div
      @click="show = !show"
      class="cursor-pointer flex items-center justify-between bg-white py-2 px-3 md:px-4 rounded-t-xl"
    >
      <RouterLink class="hover:underline" :to="{ path: '/profile', query: { user: participants[0]?.id } }">
        <div class="text-[14px] flex items-center gap-2">
          <span
            class="p-1 h-[24px] bg-primary rounded-md font-bold text-white flex justify-center items-center"
            v-if="unreads"
          >
            {{ unreads }}
          </span>

          <span class="font-bold text-[16px]">
            {{ participants[0]?.username || 'Loading...' }}
          </span>
          <span
            class="size-[15px] block rounded-full"
            :class="{
              'bg-success': participants[0]?.status === FriendStatus.Active,
              'bg-danger': participants[0]?.status === FriendStatus.Offline,
              'bg-warning': participants[0]?.status === FriendStatus.Inactive,
            }"
          ></span>
        </div>
      </RouterLink>

      <div class="flex items-center">
        <button class="group cursor-pointer rounded-full">
          <IconChevronUp
            :class="show ? '-scale-y-100 group-hover:-scale-150 ' : 'group-hover:scale-150'"
            class="w-[28px] transition-all duration-300 ease-in-out"
          />
        </button>

        <button @click.stop="emits('close', props.chatRoom.id)" class="group cursor-pointer p-2 rounded-full">
          <IconClose class="w-[20px] group-hover:scale-150 transition-all duration-300 ease-in-out" />
        </button>
      </div>
    </div>

    <ChatMessages :messages="messages" v-if="messages.length" />
    <div class="grow flex justify-center items-center" v-else>
      <p class="max-w-[300px] text-[20px]">New conversation created! Time to break the ice. 💬❄️</p>
    </div>

    <ChatInputForm
      @new-message="insertMessage"
      :room-id="props.chatRoom.id"
      :class="show ? 'flex' : 'hidden'"
    />
  </div>
</template>
