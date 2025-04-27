<script setup lang="ts">
import MenuMore from '@/components/common/menu/MenuMore.vue';
import { IconEye, IconPlus } from '@/components/icons';
import IconFlag from '@/components/icons/IconFlag.vue';
import StoryReactions from '@/components/story/StoryReactions.vue';
import type { Story } from '@/shared/types/Stories';
import { useStoriesStore } from '@/stores/stories';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const storiesStore = useStoriesStore();

const story = ref<Story | undefined>(undefined);
story.value = storiesStore.list.find((item) => item.id === route.params.id);
const menuMore = ref<InstanceType<typeof MenuMore> | undefined>();
const stories = computed(() => storiesStore.list);

function goBack() {
  router.back();
}

function report() {
  console.log('report()', menuMore.value);
  menuMore.value?.close();
}

watch(
  () => route.params,
  (val) => {
    story.value = storiesStore.list.find((item) => item.id === val.id);
  },
  { deep: true },
);

onMounted(() => {
  if (!route.params.id) {
    router.replace('/');
  }
});
</script>

<template>
  <div
    @click="goBack()"
    class="bg-gray-900/20 p-4 fixed top-0 h-svh right-0 left-0 bottom-0 flex justify-center md:items-center sm:py-16 md:py-0"
  >
    <div class="w-full flex justify-center sm:mt-4 pointer-events-none relative pb-8 md:pb-0">
      <article
        class="max-w-[620px] md:max-w-[800px] items-center flex flex-col md:flex-row gap-2 md:gap-3 grow sm:max-h-[85dvh] pointer-events-auto"
      >
        <div @click.stop class="bg-dark rounded-md sm:rounded-xl relative h-screen max-h-full">
          <div
            class="absolute top-0 z-20 bg-dark/30 w-full rounded-t-xl px-3 lg:px-6 py-3 flex items-center justify-start gap-3"
          >
            <RouterLink :to="'/profile?user=' + story?.author.id" class="flex items-center">
              <img
                :src="story?.author.image"
                alt="author"
                class="cursor-pointer rounded-full w-[60px] z-10"
              />
              <p
                class="dark-text-stroke text-light py-3 bg-dark/20 pl-8 pr-3 md:pr-5 rounded-r-full -translate-x-6 z-0"
              >
                {{ story?.author.name }}
              </p>
            </RouterLink>

            <MenuMore
              icon-class="!w-[36px]"
              vertical
              ref="menuMore"
              class="!size-[50px] bg-dark/50 ml-auto mr-0 stroke-1 fill-gray-100 hover:fill-gray-800 dark:hover:fill-gray-200"
            >
              <ul class="bg-white dark:bg-black py-1 flex flex-col text-[14px]">
                <li
                  class="py-2 px-1 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center"
                  @click="report()"
                >
                  <IconFlag class="w-[30px] mr-2 fill-dark" />
                  <span>Report</span>
                </li>
              </ul>
            </MenuMore>
          </div>

          <img
            :src="story?.image"
            class="rounded-md sm:rounded-xl h-full w-auto object-contain z-10"
            alt="story-image"
          />

          <div
            class="z-0 absolute top-[50%] text-center w-full dark-text-stroke text-light text-[18px] md:text-[20px] lg:text-[24px]"
          >
            <p class="text-center py-3 md:py-6 px-2 md:px-5 rounded-xl bg-dark/35 inline">
              {{ story?.content }}
            </p>
          </div>

          <!-- Stories navigator -->
          <div class="z-10 pb-5 pt-2 w-full bg-dark/30 rounded-b-xl absolute bottom-0">
            <div class="py-3 px-6 flex items-center">
              <div class="flex items-center gap-1">
                <IconEye class="size-[20px] fill-white" />
                <span class="text-white">{{ story?.views || 0 }} Views</span>
              </div>

              <div class="text-white ml-auto mr-0">
                {{ new Date(story?.created || '').toLocaleString() }}
              </div>
            </div>
            <ul class="flex items-center justify-center gap-3">
              <RouterLink v-for="item of stories" :key="item.id" replace :to="'/story/' + item.id">
                <li
                  class="h-[5px] md:h-[7px] w-[50px] hover:bg-light cursor-pointer rounded-full border"
                  :class="item.id === story?.id ? 'bg-light' : 'bg-light/50'"
                ></li>
              </RouterLink>
            </ul>
          </div>
        </div>

        <div
          @click.stop
          class="flex justify-between md:flex-col rounded-xl bg-light dark:bg-black/80 w-full md:w-auto md:h-full py-3 px-2"
        >
          <StoryReactions :story="story" v-if="story" />

          <button class="w-[60px] hover:bg-sky-600 cursor-pointer p-2 bg-dark rounded-full mt-auto mb-0">
            <IconPlus class="w-full fill-white" />
          </button>
        </div>
      </article>
    </div>
  </div>
</template>
