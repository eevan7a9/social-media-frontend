<script setup lang="ts">
import { ref, watch } from 'vue';
import { IconChat2 } from '../../icons';

const show = ref(false);
const notifyContainer = ref<HTMLElement | undefined>(undefined);

const chats = ref<
  {
    id: string | number;
    image: string;
    name: string;
    message: string;
    created: string | Date;
  }[]
>([
  {
    id: 'chat1',
    name: 'John Doe III',
    message: 'Rise of the new Franchise!!! Yes!!!',
    image: 'https://placehold.co/100x100/333/fff',
    created: '2025 - 01 - 02',
  },
  {
    id: 'chat2',
    name: 'Monkey D. Luffy',
    message: 'Have you seen it yet?',
    image: 'https://placehold.co/100x100/333/fff',
    created: '2025 - 01 - 01',
  },
]);

function toggle() {
  show.value = !show.value;
}

function detectOutsideClick(e: MouseEvent) {
  if (!notifyContainer.value?.contains(e.target as Node)) {
    show.value = false;
  }
}

watch(show, (val) => {
  if (val) {
    setTimeout(() => document.addEventListener('click', detectOutsideClick), 500);
  } else {
    document.removeEventListener('click', detectOutsideClick);
  }
});
</script>

<template>
  <div class="relative group">
    <div
      class="absolute text-[14px] h-[18px] w-[18px] rounded-full bg-success text-white flex items-center justify-center"
      v-if="chats.length"
    >
      {{ chats.length }}
    </div>

    <button @click="toggle()">
      <IconChat2 class="w-[40px] fill-primary group-hover:fill-sky-700 cursor-pointer" />
    </button>

    <div
      ref="notifyContainer"
      class="bg-white py-1 pb-2 dark:bg-dark absolute top-[60px] border border-gray-300 rounded-xl -right-12 w-[300px] lg:w-[360px]"
      v-if="show"
    >
      <h1 class="py-2 border-b border-gray-300 pl-3">Recent Messages:</h1>

      <article
        v-for="(chatter, i) of chats"
        :key="chatter.id"
        class="relative px-3 py-2 flex items-center gap-x-2 md:gap-x-3"
        :class="chats.length - 1 !== i ? 'border-b border-gray-200' : ''"
      >
        <img :src="chatter.image" class="w-[60px] rounded-full" alt="notify-image" />
        <div class="flex flex-col w-full">
          <h1 class="font-semibold flex justify-between">
            {{ chatter.name }}

            <span class="text-[12px] font-light text-gray-600">{{
              new Date(chatter.created).toDateString()
            }}</span>
          </h1>
          <p class="text-ellipsis line-clamp-1 text-[14px]">{{ chatter.message }}</p>
        </div>
      </article>

      <p class="px-3 py-2 text-gray-700 dark:text-gray-300 text-[14px]" v-if="!chats.length">
        Notification Empty
      </p>
    </div>
  </div>
</template>
