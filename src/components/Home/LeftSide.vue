<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { IconBookmark, IconHouse, IconThumbUp, IconCommunity, IconFollowers, IconPeople } from '../icons';
import type { GroupItem } from '@/shared/types/Group';
import type { MenuLink } from '@/shared/types/Menu';
import { GroupListItem, PageMenuItem } from '../common';
const groups = ref<GroupItem[]>([
  {
    image: 'https://placehold.co/100x100',
    title: 'Naruto Community',
    desc: 'Amet consectetur, adipisicing elit. Facere, earum?',
  },
  {
    image: 'https://placehold.co/100x100',
    title: 'NBA News & Trends',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet consectetur, adipisicing elit. Facere, earum?',
  },
  {
    image: 'https://placehold.co/100x100',
    title: 'Comedy & Memes',
    desc: 'Amet consectetur, adipisicing elit. Facere, earum?',
  },
  {
    image: 'https://placehold.co/100x100',
    title: 'Football Community',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet consectetur, adipisicing elit. Facere, earum?',
  },
  {
    image: 'https://placehold.co/100x100',
    title: 'Tech & Science',
    desc: 'Amet consectetur, adipisicing elit. Facere, earum?',
  },
]);

const menuLinks = ref<MenuLink[]>([
  {
    icon: shallowRef(IconHouse),
    title: 'home',
    path: '/',
    bg: 'bg-primary/30',
    fill: '#0e4281',
  },
  {
    icon: shallowRef(IconPeople),
    title: 'people',
    path: '/',
    bg: 'bg-success/30',
    fill: '#22970b',
  },
  {
    icon: shallowRef(IconCommunity),
    title: 'groups',
    path: '/',
    bg: 'bg-secondary/30',
    fill: '#8536b9',
  },
  {
    icon: shallowRef(IconBookmark),
    title: 'saved',
    path: '/',
    bg: 'bg-pink-500/30',
    fill: '#f6339a',
  },
  {
    icon: shallowRef(IconThumbUp),
    title: 'liked',
    path: '/',
    bg: 'bg-sky-400/30',
    fill: '#11111',
  },
  {
    icon: shallowRef(IconFollowers),
    title: 'followers',
    path: '/',
    bg: 'bg-orange-500/30',
    fill: '#884302',
  },
]);
</script>

<template>
  <section>
    <div class="px-3 py-2 h-full">
      <div class="px-3 mt-4 border-b pb-6 mb-4 border-gray-300">
        <h1 class="text-[16px] font-bold flex gap-x-2 items-center">
          My Groups
          <component :is="IconCommunity" fill="#8536b9" class="max-w-[30px] inline-block" />
        </h1>
        <ul class="flex flex-col gap-y-4 mt-4">
          <group-list-item v-for="group of groups" :key="group.title" :group="group" />
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
