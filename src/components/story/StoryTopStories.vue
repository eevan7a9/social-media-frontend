<script lang="ts" setup>
import { useStoriesStore } from '@/stores/stories';
import StoryListItem from './StoryListItem.vue';

const storiesStore = useStoriesStore();

const props = defineProps<{ itemClass?: string}>()
</script>

<template>
  <div>
    <h1 class="text-[16px] font-bold m-0">Top Stories:</h1>
    <ul class="flex gap-x-3 mt-2">
      <StoryListItem v-for="story of storiesStore.topStories" :class="props.itemClass" :key="story.id" :story="story" />
    </ul>
  </div>
</template>
