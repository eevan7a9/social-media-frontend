<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IconCommunity} from '../icons';
import type { MenuLink } from '@/shared/types/Menu';
import { GroupListItem, PageMenuItem } from '../common';
import { useGroupsStore } from '@/stores/groups';
import { menuLinks } from '@/shared/utils/menu';

const groupsStore = useGroupsStore();
const links = ref<MenuLink[]>(menuLinks);

onMounted(() => {});
</script>

<template>
  <section>
    <div class="px-3 py-2 h-full">
      <div class="px-3 mt-4 border-b pb-6 mb-4 border-gray-300 dark:border-slate-700">
        <h1 class="text-[16px] font-bold flex gap-x-2 items-center">
          Top Groups
          <component :is="IconCommunity" fill="#8536b9" class="max-w-[30px] inline-block" />
        </h1>

        <ul class="flex flex-col gap-y-4 mt-4">
          <group-list-item v-for="group of groupsStore.list" :key="group.name" :group="group" />
        </ul>
      </div>

      <div class="px-3 mt-4 border-b pb-6 mb-4 border-gray-300 dark:border-slate-700 sticky top-4">
        <h1 class="text-[16px] font-bold">Menu Links</h1>
        <ul class="flex flex-col gap-y-3 mt-4">
          <page-menu-item v-for="link of links" :key="link.title" :menu="link" />
        </ul>
      </div>
    </div>
  </section>
</template>
