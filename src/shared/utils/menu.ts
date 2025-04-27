import { shallowRef } from 'vue';
import {
  IconBookmark,
  IconHouse,
  IconThumbUp,
  IconCommunity,
  IconFollowers,
  IconPeople,
} from '@/components/icons';

export const menuLinks = [
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
];
