<script lang="ts" setup>
import { PostTypes } from '@/shared/enums/Post';
import type { Post } from '@/shared/types/Post';
import FeedTags from './FeedTags.vue';
import LeafletMap from '../common/maps/LeafletMap.vue';

const props = defineProps<{ post: Post; showTags?: boolean; detailView?: boolean }>();
</script>

<template>
  <section class="">
    <!-- Type TEXT -->
    <div class="mt-3 px-3 lg:px-5 cursor-pointer" v-if="props.post.type === PostTypes.Text">
      <h1
        class="font-light pl-2 text-clip line-clamp-3"
        :class="props.post.content.length < 40 ? 'text-[20px] md:text-[24px]' : 'text-[16px] md:text-[18px]'"
      >
        {{ props.post.content }}
      </h1>
    </div>
    <!-- TYPE IMAGE -->
    <div class="flex flex-col mt-3 px-3 lg:px-5 cursor-pointer" v-if="props.post.type === PostTypes.Image">
      <div class="text-[16px] font-light pl-2 text-clip line-clamp-2">{{ props.post.content }}</div>

      <div
        class="bg-slate-100 dark:bg-slate-900 h-full max-h-[35dvh] w-full relative overflow-hidden flex justify-center mt-3"
      >
        <img
          :src="post.image || 'https://placehold.co/800x800'"
          class="rounded-xl h-auto max-h-[1000px] w-full object-contain"
        />
      </div>
    </div>
    <!-- TYPE LOCATION -->
    <div class="flex flex-col mt-3 px-3 lg:px-5 cursor-pointer" v-if="props.post.type === PostTypes.Location">
      <div class="text-[16px] font-light pl-2">{{ props.post.content }}</div>

      <div
        class="bg-slate-100 dark:bg-slate-900 h-[350px] w-full relative overflow-hidden flex justify-center mt-3"
      >
        <LeafletMap class="h-full w-full z-10" :latlng="props.post.latlng" v-if="props.post.latlng" />
      </div>
    </div>
    <!-- TYPE LINK -->
    <div class="mt-3 px-3 lg:px-5 text-[16px] md:text-[20px] text-blue-600">
      <a :href="post.link" v-if="post.link" class="underline" target="_blank">{{ post.link }}</a>
    </div>

    <FeedTags :class="props.post.type === PostTypes.Text ? 'mt-[100px]' : 'mt-4'" v-if="showTags" />
  </section>
</template>
