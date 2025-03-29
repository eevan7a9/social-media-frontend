<script setup lang="ts">
import IconLoading from '@/components/icons/IconLoading.vue';
import useLoading from '@/composables/loading';

const loading = useLoading();
</script>

<template>
  <div>
    <div
      class="w-full z-50 text-white dark:text-white h-dvh bg-dark/70 dark:bg-dark/80 fixed top-0 flex justify-center items-center"
      v-if="loading?.isPageLoading.value"
    >
      <IconLoading class="w-[50px] animate-spin translate-y-[-1] fill-white mr-2" />
      <p class="text-[20px]">
        loadings
        <span class="transition ease-in-out duration-1000 animate-ping">...</span>
      </p>
    </div>
  </div>
</template>
