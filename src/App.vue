<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavbarTop from '@/components/layouts/NavbarTop.vue';
import MainFooter from '@/components/layouts/MainFooter.vue';
</script>

<template>
  <NavbarTop class="z-40" />
  <main class="bg-light dark:bg-dark text-dark dark:text-light h-full min-h-screen pb-4 relative z-0">
    <RouterView />
  </main>
  <MainFooter class="border-t border-gray-300" />
</template>

<style scoped></style>
