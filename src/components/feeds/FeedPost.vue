<script lang="ts" setup>
import type { Post } from '@/shared/types/Post';
import FeedComment from './FeedComment.vue';
import CreateComment from '@/components/home/CreateComment.vue';
import { onMounted, ref } from 'vue';
import FeedHeader from './FeedHeader.vue';
import FeedAction from './FeedAction.vue';
import FeedContent from './FeedContent.vue';

const props = defineProps<{ post: Post; onInitShowCreate?: boolean; showTags?: boolean }>();
const emits = defineEmits(['viewPost']);

const showCreateComment = ref(false);

function viewDetails(): void {
  emits('viewPost', props.post.id);
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
        @viewDetails="viewDetails()"
      />
      <FeedContent :post="props.post" :show-tags="props.showTags" @click="viewDetails()" />
      <FeedAction
        @click="viewDetails()"
        :post="props.post"
        @toggleComment="showCreateComment = !showCreateComment"
      />
    </article>

    <div v-if="showCreateComment">
      <CreateComment
        class="border-t border-gray-200"
        :post="post"
        :class="{ 'border-b-0': post.comments.length, 'rounded-b-xl !pb-4': !post.comments.length }"
      />
    </div>

    <div class="" v-if="post.comments[0]">
      <FeedComment @click="viewDetails()" class="rounded-t-none cursor-pointer" :comment="post.comments[0]" />
    </div>
  </div>
</template>
