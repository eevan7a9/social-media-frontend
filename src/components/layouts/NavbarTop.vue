<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import MenuProfile from '@/components/common/menu/MenuProfile.vue';
import SearchField from '@/components/common/SearchField.vue';
import MenuNotification from '@/components/common/menu/MenuNotification.vue';
import MenuChat from '../common/menu/MenuChat.vue';
import { IconHouse, IconTheme } from '../icons';
import { ToggleSwitch } from '../common';
import { onMounted, ref, watch } from 'vue';
import { useTheme } from '@/composables/theme';

const theme = useTheme();
const isDarkMode = ref(false);

watch(isDarkMode, (val) => {
  theme.toggleTheme(val);
});

onMounted(() => {
  theme.initializeTheme();
  isDarkMode.value = theme.isDark.value;
});
</script>

<template>
  <header class="relative bg-white dark:bg-dark">
    <nav class="flex items-center w-full px-3 lg:pr-6 py-1 max-w-screen-lg mx-auto">
      <RouterLink to="/" class="cursor-pointer">
        <img src="/logo.svg" class="max-w-[64px]" />
      </RouterLink>

      <ul class="pl-1 xs:pl-8 lg:pl-12  md:flex items-center gap-4">
        <RouterLink class="hidden md:block" to="/">
          <li
            class="cursor-pointer hover:underline flex items-center gap-1 text-[18px] font-semibold text-primary"
          >
            <IconHouse class="w-[36px] fill-primary dark:fill-sky-700" />
            <span class="dark:text-sky-600">Home</span>
          </li>
        </RouterLink>

        <li class="text-primary text-[18px] flex items-center gap-1">
          <IconTheme class="w-[32px] hidden sm:block fill-slate-400 dark:fill-amber-600" />
          <ToggleSwitch v-model="isDarkMode" />
        </li>
      </ul>

      <SearchField class="md:w-full md:max-w-[400px] xs:ml-3 md:ml-auto md:mr-0" />

      <div class="relative flex xs:gap-3 lg:gap-4 items-center mr-0 ml-auto">
        <MenuChat />
        <MenuNotification />
        <MenuProfile />

        <slot name="menuBtn"> </slot>
      </div>
    </nav>
  </header>
</template>
