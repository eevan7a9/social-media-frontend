<script lang="ts" setup>
import { FriendStatus } from '@/shared/enums/Friend';
import type { FriendItem } from '@/shared/types/Friend';
import { ref } from 'vue';
import { ActivityListItem, FriendListItem, StoryListItem } from '@/components/common';
import type { TopStory } from '@/shared/types/Stories';
import type { ActivityItem } from '@/shared/types/Activity';

const topStories = ref<TopStory[]>([
  {
    title: 'New Movie Release 2025',
    image: '',
    date: new Date('2024/01/02'),
  },
  {
    title: 'New Movie Release 2025',
    image: '',
    date: new Date('2024/01/02'),
  },
]);

const friends = ref<FriendItem[]>([
  {
    title: 'John Doe III',
    image: 'https://placehold.co/100x100',
    status: FriendStatus.Active,
  },
  {
    title: 'Jane Doe',
    image: 'https://placehold.co/100x100',
    status: FriendStatus.Inactive,
  },
  {
    title: 'Monkey D. Luffy',
    image: 'https://placehold.co/100x100',
    status: FriendStatus.Active,
  },
  {
    title: 'Dark Vader',
    image: 'https://placehold.co/100x100',
    status: FriendStatus.Active,
  },
  {
    title: 'Fortnite Addict',
    image: 'https://placehold.co/100x100',
    status: FriendStatus.Offline,
  },
  {
    title: 'Vivi Blue',
    image: 'https://placehold.co/100x100',
    status: FriendStatus.Offline,
  },
  {
    title: 'Aizen The Dumb',
    image: 'https://placehold.co/100x100',
    status: FriendStatus.Offline,
  },
  {
    title: 'Magnolia Sand',
    image: 'https://placehold.co/100x100',
    status: FriendStatus.Offline,
  },
]);

const latestActivities = ref<ActivityItem[]>([
  {
    image: 'https://placehold.co/100x100',
    title: 'Highlight Reel Event',
    desc: 'Added New Posts on Group Four',
    time: 'A day Ago',
  },
  {
    image: 'https://placehold.co/100x100',
    title: 'Super Bowl Events',
    desc: 'Updated Date and schedule of events',
    time: '3 hours ago',
  },
  {
    image: 'https://placehold.co/100x100',
    title: 'Exciting Super Movies',
    desc: 'Added New Posts on Group Four',
    time: 'A day Ago',
  },
]);
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
        <story-list-item v-for="story of topStories" :key="story.title" :story="story" />
      </ul>
    </div>

    <div class="sticky top-4">
      <div class="px-3">
        <h1 class="text-[16px] font-bold">My Connections:</h1>
        <ul class="flex flex-col gap-y-3 mt-2 lg:mt-3 h-[50dvh] max-h-[400px] overflow-auto relative">
          <friend-list-item v-for="friend of friends" :key="friend.title" :friend="friend" />
        </ul>
      </div>

      <div class="mt-4 border-t pt-4 border-gray-300">
        <h1 class="text-[16px] font-bold">Latest Activities:</h1>
        <ul class="flex flex-col gap-y-1 mt-3">
          <activity-list-item
            v-for="activity of latestActivities"
            :key="activity.title"
            :activity="activity"
          />
        </ul>
      </div>
    </div>
  </section>
</template>
