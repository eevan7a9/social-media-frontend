<script setup lang="ts">
import FeedCreateComment from '@/components/feeds/FeedCreateComment.vue';
import FeedHeader from '@/components/feeds/FeedHeader.vue';
import { useFeedsStore } from '@/stores/feeds';
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FeedContent from '@/components/feeds/FeedContent.vue';
import FeedAction from '@/components/feeds/FeedAction.vue';
import FeedComment from '@/components/feeds/FeedComment.vue';
import { PostTypes } from '@/shared/enums/Post';
import FeedTags from '@/components/feeds/FeedTags.vue';

const router = useRouter();
const route = useRoute();
const feedsStore = useFeedsStore();

const post = computed(() => feedsStore.list.find((feed) => feed.id === route.params.id));

function goBack() {
  router.back();
}

onMounted(() => {
  if (!post.value) {
    router.replace('/');
  }
});
</script>

<template>
  <div
    @click="goBack()"
    class="bg-gray-900/15 p-4 fixed top-0 h-svh right-0 left-0 bottom-0 flex justify-center md:items-center py-16 md:py-0"
  >
    <div class="w-full flex justify-center mt-4 pointer-events-none relative">
      <article
        class="max-w-[1200px] w-full flex flex-col md:flex-row gap-2 md:gap-3 h-full pointer-events-auto"
        :class="{ 'pt-12': post?.type === PostTypes.Text }"
      >
        <div
          class="flex min-h-[300px] flex-col bg-light rounded-xl overflow-y-auto w-full relative lg:col-span-4"
          @click.stop
        >
          <div class="flex flex-col pt-3 px-2 bg-white dark:bg-dark">
            <FeedHeader :author="post?.author" :id="post.id" :created="post.created" v-if="post" />
            <FeedContent
              class="grow"
              :show-tags="post?.type !== PostTypes.Image"
              detail-view
              :post="post"
              v-if="post"
            />
            <FeedAction :post="post" v-if="post" />
          </div>

          <div class="border-t bg-white dark:bg-dark pb-5 border-gray-200">
            <div class="px-4 pt-4 hidden md:block">
              <div class="flex items-center gap-x-2 z-0">
                <img src="https://placehold.co/60x60/162456/fff" class="w-[50px] rounded-full" />
                <div class="flex flex-col">
                  <span class="font-medium leading-4">You</span>
                </div>
              </div>
            </div>

            <FeedCreateComment :post="post" v-if="post" />
          </div>
        </div>

        <div
          @click.stop
          class="relative flex flex-col justify-between bg-slate-100 w-full h-auto max-h-[300px] md:max-h-[90dvh] md:max-w-[380px] lg:max-w-[420px] rounded-xl"
        >
          <div class="bg-white rounded-t-xl">
            <FeedTags v-if="post && post?.type === PostTypes.Image" />
            <div class="bg-white dark:bg-dark py-3 px-3 rounded-t-xl lg:text-[18px]">
              Comments <span class="text-[16px]">({{ post?.comments.length }})</span>
            </div>
          </div>

          <p v-if="!post?.comments.length" class="py-5 text-center">No Comments Yet.</p>

          <div
            class="bg-light dark:bg-gray-800 pb-3 flex flex-col gap-y-2 overflow-y-auto max-h-[300px] md:max-h-full h-full"
            v-else
          >
            <template v-for="(comment, i) of post.comments" :key="i">
              <FeedComment show-all class="!rounded-none" :post-id="post.id" :comment="comment" />
            </template>
          </div>
          <div class="bg-white h-[50px] w-full rounded-b-xl"></div>
        </div>
      </article>
    </div>
  </div>
</template>
