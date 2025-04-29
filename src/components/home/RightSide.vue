<script lang="ts" setup>
import { ActivityListItem, FriendListItem } from '@/components/common';
import { useUsersStore } from '@/stores/users';
import { useActivitiesStore } from '@/stores/activities';
import EventsList from './EventsList.vue';
import StoryTopStories from '../story/StoryTopStories.vue';

const usersStore = useUsersStore();
const activitiesStore = useActivitiesStore();
</script>

<template>
  <section>
    <EventsList />

    <StoryTopStories item-class="h-[200px]" class="hidden md:block px-3 mt-4 border-b pb-6 mb-4 border-gray-300 dark:border-slate-700" />

    <div class="sticky top-4 mt-8 md:mt-0">
      <div class="px-3">
        <h1 class="text-[16px] font-bold m-0">My Connections:</h1>
        <ul
          class="custom-scrollbar flex flex-col gap-y-3 mt-2 lg:mt-3 h-[50dvh] max-h-[400px] overflow-auto relative"
        >
          <FriendListItem v-for="friend of usersStore.friends" :key="friend.id" :friend="friend" />
        </ul>
      </div>

      <div class="mt-4 border-t pt-4 border-gray-300 dark:border-slate-700">
        <h1 class="text-[16px] font-bold m-0">Latest Activities:</h1>
        <ul class="flex flex-col gap-y-1 mt-3">
          <ActivityListItem
            v-for="activity of activitiesStore.list"
            :key="activity.title"
            :activity="activity"
          />
        </ul>
      </div>
    </div>
  </section>
</template>
