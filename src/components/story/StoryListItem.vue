<script lang="ts" setup>
import type { Story } from '@/shared/types/Stories';
import { useRouter } from 'vue-router';

const props = defineProps<{ story: Story }>();
const router = useRouter();

function viewStory() {
  router.push('/story/' + props.story.id);
}
</script>

<template>
  <li
    @click="viewStory()"
    class="hover:scale-105 transition-all ease-in-out duration-500 relative cursor-pointer w-full bg-slate-400 dark::bg-sky-950 rounded-md"
  >
    <img
      :src="props.story.author.image"
      alt="profile"
      class="size-[50px] rounded-full absolute top-2 left-1 border border-white"
    />
    <img
      :src="props.story.image || '/data/story-1.svg'"
      class="h-full w-full rounded-md object-cover"
      alt="story-image"
    />
    <p class="bg-dark/50 py-2 absolute bottom-0 text-ellipsis line-clamp-2 px-3 dark-text-stroke text-light">
      {{ props.story.content }}
    </p>
  </li>
</template>
