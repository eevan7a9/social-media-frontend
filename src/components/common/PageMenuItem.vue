<script lang="ts" setup>
import type { MenuLink } from '@/shared/types/Menu';

defineProps<{ menu: MenuLink }>();
</script>

<template>
  <li
    :key="menu.title"
    class="text-[16px] font-normal flex items-center py-2 px-3 cursor-pointer hover:bg-slate-200/50"
    :class="{ 'bg-primary/10': menu.title === 'home' }"
  >
    <div class="max-w-[40px] p-2 rounded-full" :class="menu.bg">
      <component :is="menu.icon" class="w-full h-auto" :fill="menu.fill" />
    </div>
    <span class="pl-2 lg:pl-3 capitalize">{{ menu.title }}</span>
  </li>
</template>
