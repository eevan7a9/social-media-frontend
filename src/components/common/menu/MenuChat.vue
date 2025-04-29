<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { IconChat2 } from '../../icons';
import { useChatStore } from '@/stores/chat';
import { fetchChatRooms } from '@/shared/services/chatService';

const chatStore = useChatStore();

const show = ref(false);
const notifyContainer = ref<HTMLElement | undefined>(undefined);
const totalUnreads = computed<number>(() =>
  chatStore.rooms.length
    ? chatStore.rooms.map((room) => room.unreads || 0).reduce((prev, curr) => prev + curr)
    : 0,
);

function toggle() {
  show.value = !show.value;
}

function detectOutsideClick(e: MouseEvent) {
  if (!notifyContainer.value?.contains(e.target as Node)) {
    show.value = false;
  }
}

async function getChatRooms() {
  try {
    const res = await fetchChatRooms();
    chatStore.setRooms(res);
  } catch (error) {
    throw Error('Error: ' + error);
  }
}

watch(show, (val) => {
  if (val) {
    setTimeout(() => document.addEventListener('click', detectOutsideClick), 500);
  } else {
    document.removeEventListener('click', detectOutsideClick);
  }
});

onMounted(() => {
  getChatRooms();
});
</script>

<template>
  <div class="relative group dark:text-white">
    <div
      class="absolute text-[14px] h-[18px] w-[18px] rounded-full bg-success text-white flex items-center justify-center"
      v-if="totalUnreads"
    >
      {{ totalUnreads }}
    </div>

    <button @click="toggle()">
      <IconChat2
        class="w-[30px] xs:w-[40px] fill-primary dark:fill-sky-700 group-hover:fill-sky-700 cursor-pointer"
      />
    </button>

    <div
      ref="notifyContainer"
      class="bg-white py-1 pb-2 dark:bg-dark absolute top-[60px] border border-gray-300 dark:border-slate-700 rounded-xl -right-12 w-[300px] lg:w-[360px]"
      v-if="show"
    >
      <h1 class="py-2 border-b border-gray-300 dark:border-slate-700 pl-3">Recent Messages:</h1>

      <article
        v-for="(room, i) of chatStore.rooms"
        :key="room.id"
        class="relative hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer px-3 py-2 flex items-center gap-x-2 md:gap-x-3"
        :class="chatStore.rooms.length - 1 !== i ? 'border-b border-gray-200 dark:border-slate-700' : ''"
        @click="chatStore.addRoomVisibility(room.id)"
      >
        <img :src="room.image" class="w-[60px] rounded-full" alt="notify-image" />
        <div class="flex flex-col w-full">
          <h1 class="font-semibold flex justify-between items-center">
            {{ room.title }}

            <span class="text-[12px] font-light text-gray-600 dark:text-gray-300">
              {{ new Date(room.created).toDateString() }}
            </span>
          </h1>
          <p class="relative text-ellipsis line-clamp-1 text-[14px]">
            {{ room.recentMessage?.content }}
            <small
              class="absolute bottom-2 right-3 bg-primary border border-white dark:border-black block p-[5px] rounded-full"
              v-if="room.unreads"
            ></small>
          </p>
        </div>
      </article>

      <p class="px-3 py-2 text-gray-700 dark:text-gray-300 text-[14px]" v-if="!chatStore.rooms.length">
        Notification Empty
      </p>
    </div>
  </div>
</template>
