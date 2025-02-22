<script setup lang="ts">
import { shallowRef, ref, onMounted } from 'vue';
import { IconBookmark, IconHouse, IconThumbUp, IconCommunity, IconFollowers, IconPeople } from '../icons';
import type { MenuLink } from '@/shared/types/Menu';
import { GroupListItem, PageMenuItem } from '../common';
import { useGroupsStore } from '@/stores/groups';

const groupsStore = useGroupsStore();
const menuLinks = ref<MenuLink[]>([
  {
    icon: shallowRef(IconHouse),
    title: 'home',
    path: '/',
    bg: 'bg-blue-500/30',
    fill: '#255fdd',
    disable: false,
  },
  {
    icon: shallowRef(IconPeople),
    title: 'people',
    path: '/',
    bg: 'bg-success/30',
    fill: '#22970b',
    disable: true,
  },
  {
    icon: shallowRef(IconCommunity),
    title: 'groups',
    path: '/',
    bg: 'bg-secondary/30',
    fill: '#8536b9',
    disable: true,
  },
  {
    icon: shallowRef(IconBookmark),
    title: 'saved',
    path: '/',
    bg: 'bg-pink-500/30',
    fill: '#f6339a',
    disable: true,
  },
  {
    icon: shallowRef(IconThumbUp),
    title: 'liked',
    path: '/',
    bg: 'bg-sky-400/30',
    fill: '#11111',

    disable: true,
  },
  {
    icon: shallowRef(IconFollowers),
    title: 'followers',
    path: '/',
    bg: 'bg-orange-500/30',
    fill: '#884302',
    disable: true,
  },
]);

onMounted(() => {
  if (!groupsStore.initialFetchDone) {
    groupsStore.fetchGroups().then((res) => {
      groupsStore.setGroups(res.groups);
      groupsStore.setInitialFetchDone(true);
    });
  }
});
</script>

<template>
  <section>
    <div class="px-3 py-2 h-full">
      <div class="px-3 mt-4 border-b pb-6 mb-4 border-gray-300">
        <h1 class="text-[16px] font-bold flex gap-x-2 items-center">
          Top Groups
          <component :is="IconCommunity" fill="#8536b9" class="max-w-[30px] inline-block" />
        </h1>
        <ul class="flex flex-col gap-y-4 mt-4">
          <group-list-item v-for="group of groupsStore.list" :key="group.title" :group="group" />
        </ul>
      </div>

      <div class="px-3 mt-4 border-b pb-6 mb-4 border-gray-300 sticky top-4">
        <h1 class="text-[16px] font-bold">Menu Links</h1>
        <ul class="flex flex-col gap-y-3 mt-4">
          <page-menu-item v-for="menu of menuLinks" :key="menu.title" :menu="menu" />
        </ul>
      </div>
    </div>
  </section>
</template>
