<script lang="ts" setup>
import FeedPost from './FeedPost.vue';
import { onMounted } from 'vue';
import { useFeedsStore } from '@/stores/feeds';
import { useRoute, useRouter } from 'vue-router';

const feedStore = useFeedsStore();
const router = useRouter();
const route = useRoute();

function viewPost(id: string | number) {
  router.push('/feed/' + id);
}

onMounted(() => {
  feedStore.fetchFeeds().then((res) => {
    feedStore.setFeeds(res.posts);
  });

  if (!route.params.id) {
    router.replace('/');
  }
});
</script>

<template>
  <div class="flex flex-col gap-y-5 lg:gap-y-7 pb-[200px]">
    <template v-for="(post, i) of feedStore.lists" :key="post.id">
      <feed-post :post="post" :onInitShowCreate="i == 0" @viewPost="viewPost" />
    </template>
  </div>
</template>
