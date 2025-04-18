<script lang="ts" setup>
import FeedCreateForm from '@/components/feeds/FeedCreateForm.vue';
</script>
<template>
  <div
    class="bg-white border border-gray-200 dark:bg-dark px-3 py-2 lg:py-4 rounded-md lg:rounded-xl flex gap-x-3"
  >
    <div>
      <span class="max-w-[70px] lg:max-w-[80px] flex border-2 border-primary rounded-full">
        <img src="https://placehold.co/100x100/0e4281/FFF" class="rounded-full" />
      </span>
    </div>
    <div class="w-full">
      <div>
        <FeedCreateForm />
      </div>
    </div>
  </div>
</template>
