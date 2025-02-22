<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import NavbarTop from '@/components/layouts/NavbarTop.vue';
import MainFooter from '@/components/layouts/MainFooter.vue';
import { computed } from 'vue';
import AlertDefault from './components/common/alerts/AlertDefault.vue';

const route = useRoute();
const isDetailsView = computed(() => route.name === 'feedDetailView');
</script>

<template>
  <NavbarTop :class="isDetailsView ? 'z-0' : 'z-20'" />
  <AlertDefault class="z-50" />
  <main class="bg-light dark:bg-dark text-dark dark:text-light h-full min-h-screen pb-4 relative z-0">
    <RouterView />
  </main>
  <MainFooter class="border-t border-gray-300" />
</template>

<style scoped></style>
