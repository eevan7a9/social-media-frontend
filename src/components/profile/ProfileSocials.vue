<script lang="ts" setup>
import {
  IconFacebook,
  IconGithub,
  IconInstagram,
  IconTwitch,
  IconTwiter,
  IconYoutube,
} from '@/components/icons';
import type { User } from '@/shared/types/User';

const props = defineProps<{ user: User }>();

const github = props.user.socials?.github;
const twitch = props.user.socials?.twitch;
const twitter = props.user.socials?.twitter;
const instagram = props.user.socials?.instagram;
const facebook = props.user.socials?.facebook;
const youtube = props.user.socials?.youtube;
</script>
<template>
  <div class="flex flex-wrap md:w-[200px] gap-3">
    <a target="__blank" :href="github" :class="github ? 'cursor-pointer' : 'cursor-not-allowed'">
      <IconGithub class="w-[38px]" :class="github ? 'fill-primary' : 'fill-slate-400 dark:fill-slate-700'" />
    </a>

    <a target="__blank" :href="twitter" :class="twitter ? 'cursor-pointer' : 'cursor-not-allowed'">
      <IconTwiter class="w-[38px]" :class="twitter ? 'fill-primary' : 'fill-slate-400 dark:fill-slate-700'" />
    </a>

    <a target="__blank" :href="instagram" :class="instagram ? 'cursor-pointer' : 'cursor-not-allowed'">
      <IconInstagram
        class="w-[35px]"
        :class="instagram ? 'fill-primary' : 'fill-slate-400 dark:fill-slate-700'"
      />
    </a>
    <a target="__blank" :href="facebook" :class="facebook ? 'cursor-pointer' : 'cursor-not-allowed'">
      <IconFacebook
        class="w-[35px]"
        :class="facebook ? 'fill-primary' : 'fill-slate-400 dark:fill-slate-700'"
      />
    </a>
    <a target="__blank" :href="youtube" :class="youtube ? 'cursor-pointer' : 'cursor-not-allowed'">
      <IconYoutube
        class="h-[45px]"
        :class="youtube ? 'fill-primary' : 'fill-slate-400 dark:fill-slate-700'"
      />
    </a>
    <a target="__blank" :href="twitch" :class="twitch ? 'cursor-pointer' : 'cursor-not-allowed'">
      <IconTwitch class="w-[38px]" :class="twitch ? 'fill-primary' : 'fill-slate-400 dark:fill-slate-700'" />
    </a>
  </div>
</template>
