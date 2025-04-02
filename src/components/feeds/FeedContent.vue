<script lang="ts" setup>
import { PostTypes } from '@/shared/enums/Post';
import type { Post } from '@/shared/types/Post';
import FeedTags from './FeedTags.vue';

const props = defineProps<{ post: Post; showTags?: boolean; detailView?: boolean }>();
</script>

<template>
  <section class="">
    <div class="mt-3 px-3 lg:px-5 cursor-pointer" v-if="props.post.type === PostTypes.Text">
      <h1 class="text-[16px] font-light pl-2">{{ props.post.content }}</h1>
    </div>

    <div class="flex flex-col mt-3 px-3 lg:px-5 cursor-pointer" v-if="props.post.type === PostTypes.Image">
      <div class="text-[16px] font-light pl-2">{{ props.post.content }}</div>

      <div
        class="bg-slate-100 dark:bg-slate-900 h-full max-h-[35dvh] w-full relative overflow-hidden flex justify-center mt-3"
      >
        <img
          :src="post.image || 'https://placehold.co/800x800'"
          class="rounded-xl h-auto w-full object-cover"
        />
      </div>
    </div>

    <FeedTags :class="props.post.type === PostTypes.Text ? 'mt-[100px]' : 'mt-4'" v-if="showTags" />
  </section>
</template>
