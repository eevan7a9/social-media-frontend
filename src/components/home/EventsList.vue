<script lang="ts" setup>
import type { SocialEvent } from '@/shared/types/SocialEvent';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const url = import.meta.env.VITE_APP_EVENTS_URL || import.meta.env.VITE_APP_BASE_URL + '/events';

const events = ref<SocialEvent[]>([]);

onMounted(async () => {
  try {
    const res = await axios.get<SocialEvent[]>(url);
    events.value = res.data;
  } catch (error) {
    console.error(error);
    throw Error('Error fetching Events');
  }
});
</script>

<template>
  <div class="bg-white rounded-md px-3 lg:pl-5 py-2 lg:py-3">
    <h1 class="text-[16px] font-bold m-0">Upcoming Events</h1>
    <ul class="flex flex-col gap-y-3 mt-2">
      <li v-for="event of events" :key="event.id">
        <span class="text-[14px] font-semibold text-blue-950 dark:text-gray-200">
          {{ event.title }}
        </span>
        - <small>{{ new Date(event.eventDate).toLocaleDateString() }}</small>
        <p class="text-[13px] font-light max-w-[250px]">
          {{ event.desc }}
        </p>
      </li>
    </ul>
  </div>
</template>
