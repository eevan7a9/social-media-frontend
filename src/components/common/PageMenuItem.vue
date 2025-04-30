<script lang="ts" setup>
import { useAlertRestricted } from '@/composables/alert';
import type { MenuLink } from '@/shared/types/Menu';
import { useRouter } from 'vue-router';

const props = defineProps<{ menu: MenuLink }>();

const alert = useAlertRestricted();
const router = useRouter();

function changePage() {
  if (props.menu.disable) {
    return alert.value.showRestricted(
      'You Shall Not Pass!" 🧙‍♂️',
      'Sorry, this section is off-limits for now.',
      '/images/restricted.svg',
    );
  }
  router.push(props.menu.path);
}
</script>

<template>
  <li
    :key="menu.title"
    class="text-[16px] font-normal flex items-center cursor-not-allowed py-2 px-3"
    :class="{
      'bg-primary/10': menu.title === 'home',
      'cursor-pointer hover:bg-slate-200/50 dark:hover:bg-slate-600/40': !menu.disable,
    }"
    @click="changePage"
  >
    <div class="max-w-[40px] p-2 rounded-full" :class="menu.bg">
      <component :is="menu.icon" class="w-full h-auto" :fill="menu.fill" />
    </div>
    <span class="pl-2 lg:pl-3 capitalize">{{ menu.title }}</span>
  </li>
</template>
