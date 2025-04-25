<script lang="ts" setup>
import { ActivityListItem, FriendListItem } from '@/components/common';
import { useUsersStore } from '@/stores/users';
import { useActivitiesStore } from '@/stores/activities';
import { useStoriesStore } from '@/stores/stories';
import StoryListItem from '../story/StoryListItem.vue';
import EventsList from './EventsList.vue';

const usersStore = useUsersStore();
const activitiesStore = useActivitiesStore();
const storiesStore = useStoriesStore();
</script>

<template>
  <section>
    <EventsList />

    <div class="px-3 mt-4 border-b pb-6 mb-4 border-gray-300">
      <h1 class="text-[16px] font-bold m-0">Top Stories:</h1>
      <ul class="flex gap-x-3 mt-2">
        <StoryListItem v-for="story of storiesStore.topStories" :key="story.id" :story="story" />
      </ul>
    </div>

    <div class="sticky top-4">
      <div class="px-3">
        <h1 class="text-[16px] font-bold m-0">My Connections:</h1>
        <ul
          class="custom-scrollbar flex flex-col gap-y-3 mt-2 lg:mt-3 h-[50dvh] max-h-[400px] overflow-auto relative"
        >
          <FriendListItem v-for="friend of usersStore.friends" :key="friend.id" :friend="friend" />
        </ul>
      </div>

      <div class="mt-4 border-t pt-4 border-gray-300">
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
