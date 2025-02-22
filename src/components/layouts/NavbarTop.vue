<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import MenuProfile from '@/components/common/menu/MenuProfile.vue';
import SearchField from '@/components/common/SearchField.vue';
import MenuNotification from '@/components/common/menu/MenuNotification.vue';
import MenuChat from '../common/menu/MenuChat.vue';
</script>

<template>
  <header class="relative bg-white dark:bg-dark">
    <nav class="flex items-center w-full px-3 lg:pr-6 py-1 max-w-screen-lg mx-auto">
      <RouterLink to="/" class="cursor-pointer">
        <img src="/logo.svg" class="max-w-[64px]" />
      </RouterLink>

      <SearchField class="w-full max-w-[400px] ml-auto mr-0" />

      <ul class="flex gap-3 lg:gap-4 items-center mr-0 ml-auto">
        <MenuChat />
        <MenuNotification />
        <MenuProfile />
      </ul>
    </nav>
  </header>
</template>
