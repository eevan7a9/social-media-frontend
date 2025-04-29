<script lang="ts" setup>
import FeedPost from './FeedPost.vue';
import { computed, onMounted } from 'vue';
import { useFeedsStore } from '@/stores/feeds';
import type { Post } from '@/shared/types/Post';

const feedsStore = useFeedsStore();

const props = defineProps<{ userId?: string }>();
const feeds = computed<Post[]>(() => {
  if (!props.userId) {
    return feedsStore.list;
  }

  return feedsStore.list.filter((feed) => feed.author.id === props.userId);
});

onMounted(() => {});
</script>

<template>
  <div class="flex flex-col gap-y-5 lg:gap-y-7 pb-[200px]" v-if="feeds.length">
    <template v-for="(post, i) of feeds" :key="post.id">
      <feed-post :post="post" :onInitShowCreate="i == 0" />
    </template>
  </div>

  <div class="py-[100px] border border-gray-300 dark:border-slate-700" v-else>
    <slot name="empty">
      <p class="text-[24px] md:text-[28px] font-light text-center">
        No public posts available. Check back later!
      </p>
    </slot>
  </div>
</template>
