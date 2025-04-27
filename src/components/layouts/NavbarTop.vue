<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import MenuProfile from '@/components/common/menu/MenuProfile.vue';
import SearchField from '@/components/common/SearchField.vue';
import MenuNotification from '@/components/common/menu/MenuNotification.vue';
import MenuChat from '../common/menu/MenuChat.vue';
import { IconHouse } from '../icons';
</script>

<template>
  <header class="relative bg-white dark:bg-dark">
    <nav class="flex items-center w-full px-3 lg:pr-6 py-1 max-w-screen-lg mx-auto">
      <RouterLink to="/" class="cursor-pointer">
        <img src="/logo.svg" class="max-w-[64px]" />
      </RouterLink>

      <ul class="pl-8 lg:pl-12 hidden md:block">
        <RouterLink to="/">
          <li
            class="cursor-pointer hover:underline flex items-center gap-1 text-[18px] font-semibold text-primary"
          >
            <IconHouse class="w-[36px] fill-primary" />
            <span>Home</span>
          </li>
        </RouterLink>
      </ul>

      <SearchField class="md:w-full md:max-w-[400px] ml-3 md:ml-auto md:mr-0" />

      <div class="relative flex gap-3 lg:gap-4 items-center mr-0 ml-auto">
        <MenuChat />
        <MenuNotification />
        <MenuProfile />

        <slot name="menuBtn"> </slot>
      </div>
    </nav>
  </header>
</template>
