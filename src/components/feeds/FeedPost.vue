<script lang="ts" setup>
import type { Post } from '@/shared/types/Post';
import FeedComment from './FeedComment.vue';
import FeedCreateComment from '@/components/feeds/FeedCreateComment.vue';
import { onMounted, ref } from 'vue';
import FeedHeader from './FeedHeader.vue';
import FeedAction from './FeedAction.vue';
import FeedContent from './FeedContent.vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const props = defineProps<{ post: Post; onInitShowCreate?: boolean; showTags?: boolean }>();
const showCreateComment = ref(false);

function viewPost(id: string | number) {
  if (route.name === 'home') {
    router.push('/feed/' + id);
  } else if (route.name === 'profile') {
    router.push({ path: '/profile/feed/' + id, query: route.query });
  }
}

onMounted(() => {
  if (props.onInitShowCreate) {
    showCreateComment.value = true;
  }
});
</script>

<template>
  <div>
    <article
      class="bg-white dark:bg-dark pt-3 lg:pt-4 rounded-t-xl"
      :class="{
        'rounded-b-xl': !post.comments.length && !showCreateComment,
        'border-b-0': post.comments.length || showCreateComment,
      }"
    >
      <FeedHeader
        :id="props.post.id"
        :author="props.post.author"
        :created="props.post.created"
        format-dates-ago
        @viewDetails="viewPost(props.post.id)"
      />
      <FeedContent :post="props.post" :show-tags="props.showTags" @click="viewPost(props.post.id)" />
      <FeedAction
        @click="viewPost(props.post.id)"
        :post="props.post"
        @toggleComment="showCreateComment = !showCreateComment"
      />
    </article>

    <div v-if="showCreateComment">
      <FeedCreateComment
        class="border-t border-gray-200"
        :post="post"
        :class="{ 'border-b-0': post.comments.length, 'rounded-b-xl !pb-4': !post.comments.length }"
      />
    </div>

    <div class="" v-if="post.comments[0]">
      <FeedComment
        @click="viewPost(props.post.id)"
        class="rounded-t-none cursor-pointer"
        :post-id="post.id"
        :comment="post.comments[0]"
      />
    </div>
  </div>
</template>
