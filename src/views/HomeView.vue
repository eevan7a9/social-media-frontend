<script setup lang="ts">
import LeftSide from '@/components/home/LeftSide.vue';
import RightSide from '@/components/home/RightSide.vue';
import CreatePost from '@/components/home/CreatePost.vue';
import FeedsList from '@/components/feeds/FeedsList.vue';
import StoryTopStories from '@/components/story/StoryTopStories.vue';
</script>

<template>
  <div class="grid grid-cols-12 w-full max-w-screen-lg mx-auto relative">
    <LeftSide class="hidden md:block md:col-span-3 pt-3 lg:pt-4 z-0" />

    <section class="col-span-12 sm:col-span-8 md:col-span-6 h-full pt-4 px-3 z-10">
      <CreatePost class="sticky top-3 z-20" />
      <div class="bg-gray-300 dark:bg-slate-700 w-full h-[1px] my-5"></div>
      <StoryTopStories class="md:hidden py-3" />
      <FeedsList class="z-10" />
      <RouterView class="z-20" />
    </section>

    <RightSide class="hidden sm:block sm:col-span-4 md:col-span-3 relative pt-3 lg:pt-4 z-0" />
  </div>
</template>

<style lang="scss" scoped></style>
