<script lang="ts" setup>
import FeedCreateForm from '@/components/feeds/FeedCreateForm.vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
</script>

<template>
  <div
    class="bg-white border border-gray-200 dark:bg-dark dark:border-slate-700 px-3 py-3 lg:py-4 rounded-md lg:rounded-xl flex gap-x-3"
  >
    <div class="w-[100px]">
      <span
        class="w-[50px] h-[50px] md:w-[80px] md:h-[80px] flex border-2 border-primary rounded-full overflow-hidden"
      >
        <img
          :src="auth.authUser?.image || 'https://placehold.co/100x100/0e4281/FFF'"
          class="w-full h-full object-cover"
        />
      </span>
    </div>
    <div class="w-full">
      <div>
        <FeedCreateForm />
      </div>
    </div>
  </div>
</template>
