<script lang="ts" setup>
import type { Post } from '@/shared/types/Post';
import FeedPost from '@/components/home/feeds/FeedPost.vue';
import { ref } from 'vue';

const feeds = ref<Post[]>([]);
</script>

<template>
  <div class="flex flex-col gap-y-5 lg:gap-y-7 pb-[200px]">
    <template v-for="(post, i) of feeds" :key="post.id">
      <feed-post :post="post" :onInitShowCreate="i == 0" />
    </template>
  </div>
</template>
