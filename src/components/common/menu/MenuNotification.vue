<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { IconBell } from '../../icons';
import type { AppNotification } from '@/shared/types/Notification';
import { IconClose } from '@/components/icons';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const url =
  import.meta.env.VITE_APP_NOTIFICATIONS_URL || import.meta.env.VITE_APP_BASE_URL + '/notifications';

const route = useRoute();
const router = useRouter();

const show = ref(false);
const notifyContainer = ref<HTMLElement | undefined>(undefined);
const notifications = ref<AppNotification[]>([]);
const unreadNotifications = computed(() => notifications.value.filter((i) => i.unread).length);

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

function viewNotification(id: string, type: string) {
  show.value = false;
  if (route.path.includes('profile')) {
    router.push({
      path: `profile/${type}/${id}`,
      query: { ...route.query },
    });
    return;
  }
  router.push(`/${type}/${id}`);
}

watch(show, (val, prev) => {
  if (val) {
    setTimeout(() => document.addEventListener('click', detectOutsideClick), 500);
  } else {
    document.removeEventListener('click', detectOutsideClick);
  }

  if (prev && !val) {
    notifications.value = notifications.value.map((i) => {
      i.unread = false;
      return i;
    });
  }
});

onMounted(async () => {
  const res = await axios.get<AppNotification[]>(url);
  if (res.status === 200) {
    notifications.value = res.data;
  }
});
</script>

<template>
  <div class="relative group">
    <div
      class="absolute text-[14px] h-[18px] w-[18px] rounded-full bg-danger text-white flex items-center justify-center"
      v-if="unreadNotifications"
    >
      {{ unreadNotifications }}
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
        class="relative px-3 py-2 flex items-center gap-x-2 md:gap-x-3 hover:bg-slate-100 dark:hover:bg-slate-800"
        :class="notifications.length - 1 !== i ? 'border-b border-gray-200' : ''"
      >
        <img :src="notification.image" class="w-[60px] rounded-sm" alt="notify-image" />

        <div
          class="hover:underline flex flex-col cursor-pointer"
          @click="viewNotification(notification.targetId, notification.target)"
        >
          <h1 :class="notification.unread ? 'font-bold' : 'font-normal'">{{ notification.title }}</h1>
          <p class="text-ellipsis line-clamp-1 text-[14px] font-light">{{ notification.desc }}</p>
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
