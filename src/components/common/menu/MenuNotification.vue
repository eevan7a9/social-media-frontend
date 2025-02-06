<script setup lang="ts">
import { ref, watch } from 'vue';
import { IconBell } from '../../icons';
import type { AppNotification } from '@/shared/types/Notification';
import { NotificationType } from '@/shared/enums/Notification';
import { IconClose } from '@/components/icons';

const show = ref(false);
const notifyContainer = ref<HTMLElement | undefined>(undefined);

const notifications = ref<AppNotification[]>([
  {
    id: 'n1',
    title: 'Your Post Was Liked',
    desc: "Someone liked your post: 'New Movie is Lit...'",
    type: NotificationType.Liked,
    image: 'https://placehold.co/100x100/770101/fff',
  },
  {
    id: 'n2',
    title: 'New Post from a Friend',
    desc: "Your friend posted: 'New Movie is Lit...'",
    type: NotificationType.Post,
    image: 'https://placehold.co/100x100/450257/fff',
  },
  {
    id: 'n3',
    title: 'New Comment on Your Post',
    desc: "Someone commented on your post: 'New Movie is Lit...'",
    type: NotificationType.Comment,
    image: 'https://placehold.co/100x100/1f2e56/fff',
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

function remove(id: number | string): void {
  if (!id) return;
  setTimeout(() => {
    notifications.value = notifications.value.filter((item) => item.id !== id);
    if (!notifications.value.length) {
      show.value = false;
    }
  }, 300);
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
      class="absolute text-[14px] h-[18px] w-[18px] rounded-full bg-danger text-white flex items-center justify-center"
      v-if="notifications.length"
    >
      {{ notifications.length }}
    </div>

    <button @click="toggle()">
      <IconBell class="w-[35px] fill-primary group-hover:fill-sky-700 cursor-pointer" />
    </button>

    <div
      ref="notifyContainer"
      class="bg-white py-1 pb-2 dark:bg-dark absolute top-[60px] border border-gray-300 rounded-xl -right-12 w-[300px] lg:w-[340px]"
      v-if="show"
    >
      <h1 class="py-2 border-b border-gray-300 pl-3">Notifications:</h1>

      <article
        v-for="(notification, i) of notifications"
        :key="notification.id"
        class="relative px-3 py-2 flex items-center gap-x-2 md:gap-x-3"
        :class="notifications.length - 1 !== i ? 'border-b border-gray-200' : ''"
      >
        <img :src="notification.image" class="w-[60px] rounded-sm" alt="notify-image" />
        <div class="flex flex-col">
          <h1 class="font-semibold">{{ notification.title }}</h1>
          <p class="text-ellipsis line-clamp-1 text-[14px]">{{ notification.desc }}</p>
        </div>

        <button
          @click="remove(notification.id)"
          class="absolute p-1 cursor-pointer rounded-full hover:bg-gray-200 dark:bg-gray-600 top-[12px] right-[8px]"
        >
          <IconClose class="w-[20px]" />
        </button>
      </article>
      <p class="px-3 py-2 text-gray-700 dark:text-gray-300 text-[14px]" v-if="!notifications.length">
        Notification Empty
      </p>
    </div>
  </div>
</template>
