<script lang="ts" setup>
import { ActivityListItem, FriendListItem } from '@/components/common';
import { useFriendsStore } from '@/stores/friends';
import { useActivitiesStore } from '@/stores/activities';
import { useStoriesStore } from '@/stores/stories';
import StoryListItem from '../story/StoryListItem.vue';

const friendsStore = useFriendsStore();
const activitiesStore = useActivitiesStore();
const storiesStore = useStoriesStore();
</script>

<template>
  <section>
    <div class="bg-white rounded-md px-3 lg:pl-5 py-2 lg:py-3">
      <h1 class="text-[16px] font-bold">Upcoming Events</h1>
      <ul class="flex flex-col gap-y-3 mt-2">
        <li>
          <span class="text-[14px] font-semibold text-blue-950 dark:text-gray-200">Birthday</span>
          <p class="text-[13px] font-light max-w-[250px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, modi.
          </p>
        </li>
        <li>
          <span class="text-[14px] font-semibold text-blue-950 dark:text-gray-200">Fiesta Cebu</span>
          <p class="text-[13px] font-light max-w-[250px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, modi.
          </p>
        </li>
      </ul>
    </div>

    <div class="px-3 mt-4 border-b pb-6 mb-4 border-gray-300">
      <h1 class="text-[16px] font-bold">Top Stories:</h1>
      <ul class="flex gap-x-3 mt-2">
        <StoryListItem v-for="story of storiesStore.topStories" :key="story.id" :story="story" />
      </ul>
    </div>

    <div class="sticky top-4">
      <div class="px-3">
        <h1 class="text-[16px] font-bold">My Connections:</h1>
        <ul
          class="custom-scrollbar flex flex-col gap-y-3 mt-2 lg:mt-3 h-[50dvh] max-h-[400px] overflow-auto relative"
        >
          <FriendListItem v-for="friend of friendsStore.list" :key="friend.id" :friend="friend" />
        </ul>
      </div>

      <div class="mt-4 border-t pt-4 border-gray-300">
        <h1 class="text-[16px] font-bold">Latest Activities:</h1>
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
