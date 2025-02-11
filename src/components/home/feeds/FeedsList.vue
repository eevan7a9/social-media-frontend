<script lang="ts" setup>
import FeedPost from '@/components/home/feeds/FeedPost.vue';
import { onMounted } from 'vue';
import { useFeedsStore } from '@/stores/feeds';

const feedStore = useFeedsStore();

onMounted(() => {
  feedStore.fetchFeeds().then((res) => {
    feedStore.setFeeds(res.posts);
  });
});
</script>

<template>
  <div class="flex flex-col gap-y-5 lg:gap-y-7 pb-[200px]">
    <template v-for="(post, i) of feedStore.lists" :key="post.id">
      <feed-post :post="post" :onInitShowCreate="i == 0" />
    </template>
  </div>
</template>
