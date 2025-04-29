<script lang="ts" setup>
import type { MenuLink } from '@/shared/types/Menu';
import { menuLinks } from '@/shared/utils/menu';
import { ref, watch } from 'vue';
import PageMenuItem from '../common/PageMenuItem.vue';
import { IconClose } from '../icons';

const model = defineModel({
  type: Boolean,
  required: true,
});

const sidebarContainer = ref<HTMLElement>();
const links = ref<MenuLink[]>(menuLinks);

function detectClickMobileNav(event: MouseEvent) {
  console.log(model.value);
  const element = event.target as Node;
  if (!sidebarContainer.value?.contains(element)) {
    model.value = false;
  }
}

watch(model, (val) => {
  if (val) {
    setTimeout(() => document.addEventListener('click', detectClickMobileNav), 300);
    return;
  }
  document.removeEventListener('click', detectClickMobileNav);
});
</script>

<template>
  <section
    ref="sidebarContainer"
    :class="model ? 'translate-x-0' : 'translate-x-[331px] sm:translate-x-[381px]'"
    class="transition-all duration-500 ease-in-out bg-light dark:bg-slate-950 dark:text-white fixed top-0 right-0 w-[330px] sm:w-[380px] min-h-screen"
  >
    <div class="relative z-10">
      <button
        @click="model = false"
        class="absolute top-1 right-3 p-2 cursor-pointer rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800"
      >
        <IconClose class="w-[40px] dark:fill-white" />
      </button>
    </div>

    <div class="z-0 px-3 mt-4 border-b pt-3 pb-6 mb-4 border-gray-300 dark:border-slate-700 sticky top-4">
      <h1 class="text-[16px] font-bold">Menu Links</h1>
      <ul class="flex flex-col gap-y-3 mt-4">
        <PageMenuItem v-for="link of links" :key="link.title" :menu="link" />
      </ul>
    </div>
  </section>
</template>
