<script lang="ts" setup>
import {
  IconCheckDecagram,
  IconFacebook,
  IconGithub,
  IconInstagram,
  IconMapPin,
  IconPeople,
  IconTwitch,
  IconTwiter,
  IconYoutube,
} from '@/components/icons';
import { onMounted, ref, watch } from 'vue';
import ButtonConnection from '../common/buttons/ButtonConnection.vue';
import type { User } from '@/shared/types/User';
import { useAlert } from '@/composables/alert';
import { AlertType } from '@/shared/enums/Alert';
import { useAuthStore } from '@/stores/auth';

const alert = useAlert();
const auth = useAuthStore();

const props = defineProps<{
  profile: User;
  isMe?: boolean;
  website?: string;
}>();

const github = props.profile.socials?.github;
const twitch = props.profile.socials?.twitch;
const twitter = props.profile.socials?.twitter;
const instagram = props.profile.socials?.instagram;
const facebook = props.profile.socials?.facebook;
const youtube = props.profile.socials?.youtube;

const isConnected = ref(false);
const isVerified = ref(true);

function addUser(user: User) {
  isConnected.value = !isConnected.value;

  if (isConnected.value) {
    alert.showAlert(`You added ${user.username.slice(0, 10)}...`, AlertType.Info);
  }
}

function setIsConnected(user: User) {
  isConnected.value = !!user.connections?.includes(auth.authUser?.id || '');
}

watch(
  () => props.profile,
  (val) => setIsConnected(val),
  { deep: true },
);

onMounted(() => setIsConnected(props.profile));
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-12 justify-between">
    <div class="col-span-1 md:col-span-7 lg:col-span-8 flex gap-2 w-full">
      <img
        :src="profile.image"
        class="-translate-y-[50px] sm:-translate-y-[100px] object-contain w-[200px] h-[200px] rounded-full bg-gray-300 border-2 border-light overflow-hidden"
      />
      <!-- info -->
      <div class="pt-3">
        <h1 class="flex items-center gap-3 text-[20px] md:text-[32px] font-black">
          {{ profile.username || 'Eevan7a9' }}
          <div
            class="cursor-pointer font-medium text-[14px] md:text-[18px] text-gray-700 dark:text-gray-400 mt-2 py-2 pr-5 rounded-md flex items-center gap-1"
            v-if="isVerified"
          >
            <IconCheckDecagram class="w-[32px] fill-primary" />
            <span class="hidden sm:block">{{ isVerified ? 'User Verified' : 'Unverified' }}</span>
          </div>
        </h1>

        <div class="flex gap-x-3 font-light text-[14px] sm:text-[18px]">
          <!-- Role | occupation -->
          <span>{{ profile.occupation || 'Software Developer' }}</span>
          <span class="hidden xs:inline">| {{ profile.company }}</span>
        </div>

        <div class="text-[12px] sm:text-[16px] flex flex-col sm:flex-row sm:items-center gap-x-1">
          <!-- country -->
          <span class="font-bold">{{ profile.country || 'Philippines' }}, </span>
          <div class="flex items-center">
            <span>{{ profile.city || 'City of The Dead' }}</span>
            <IconMapPin class="w-[20px] sm:w-[30px]" />
          </div>
        </div>

        <div class="flex items-center gap-3">
          <ButtonConnection :is-connected="isConnected" @click="addUser(props.profile)" v-if="!props.isMe" />

          <button
            class="text-[14px] sm:text-[16px] md:text-[18px] cursor-not-allowed text-light items-center bg-primary mt-2 py-1 sm:py-2 pl-3 pr-5 rounded-md flex gap-x-2"
            v-else
          >
            <IconPeople class="w-[20px] sm:w-[28px] fill-light" />
            My Connections
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-start w-full md:pt-6 pl-3 sm:pl-8 md:pl-3">
      <h1 class="text-[16px] sm:text-[18px] font-semibold text-nowrap">My Socials:</h1>
      <div class="flex flex-wrap md:w-[200px] gap-3">
        <a target="__blank" :href="github" :class="github ? 'cursor-pointer' : 'cursor-not-allowed'">
          <IconGithub
            class="w-[38px]"
            :class="github ? 'fill-primary' : 'fill-slate-400 dark:fill-slate-700'"
          />
        </a>

        <a target="__blank" :href="twitter" :class="twitter ? 'cursor-pointer' : 'cursor-not-allowed'">
          <IconTwiter
            class="w-[38px]"
            :class="twitter ? 'fill-primary' : 'fill-slate-400 dark:fill-slate-700'"
          />
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
          <IconTwitch
            class="w-[38px]"
            :class="twitch ? 'fill-primary' : 'fill-slate-400 dark:fill-slate-700'"
          />
        </a>
      </div>
      <a
        :href="props.profile.website || 'http://evanmarc.com'"
        class="underline mt-2 text-nowrap text-blue-500"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ props.profile.website || 'http://evanmarc.com' }}
      </a>
    </div>
  </div>
</template>
