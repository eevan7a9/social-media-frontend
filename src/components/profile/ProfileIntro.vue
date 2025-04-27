<script lang="ts" setup>
import { IconCheckDecagram, IconMapPin, IconPeople } from '@/components/icons';
import { onMounted, ref, watch } from 'vue';
import ButtonConnection from '../common/buttons/ButtonConnection.vue';
import type { User } from '@/shared/types/User';
import { useAlert, useAlertConfirmation } from '@/composables/alert';
import { AlertType } from '@/shared/enums/Alert';
import { useAuthStore } from '@/stores/auth';
import { ButtonSendMessage } from '../common/buttons';
import ProfileSocials from './ProfileSocials.vue';
import { useUsersStore } from '@/stores/users';

const alert = useAlert();
const usersStore = useUsersStore();
const auth = useAuthStore();
const alertConfirm = useAlertConfirmation();

const props = defineProps<{
  profile: User;
  isMe?: boolean;
  website?: string;
}>();

const isConnected = ref(false);
const isVerified = ref(true);

async function removeConnection() {
  if (isConnected.value) {
    const res = await alertConfirm.value.show(
      'Remove Connection',
      'Are you sure you want to remove this user from your connections?',
    );

    if (res && auth.authUser) {
      auth.removeConnection(props.profile.id);
      usersStore.removeUserConnection(auth.authUser.id);

      isConnected.value = false;
      return alert.showAlert(
        `You have removed ${props.profile.username.slice(0, 10)}... from your connections.`,
        AlertType.Info,
      );
    }
  }
}

function setIsConnected(user: User) {
  isConnected.value = auth.authUser?.connections?.includes(user.id) || false;
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
    <div class="col-span-1 md:col-span-7 lg:col-span-8 flex flex-col xs:flex-row gap-2 w-full">
      <img
        :src="profile.image"
        class="-translate-y-[50px] sm:-translate-y-[100px] object-contain w-[200px] h-[200px] rounded-full bg-gray-300 border-2 border-light overflow-hidden"
      />
      <!-- info -->
      <div class="pt-3 -translate-y-[70px] xs:translate-y-0">
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

        <div class="text-[14px] sm:text-[16px] flex flex-col sm:flex-row sm:items-center gap-x-1">
          <!-- country -->
          <span class="font-bold">{{ profile.country || 'Philippines' }}, </span>
          <div class="flex items-center">
            <span>{{ profile.city || 'City of The Dead' }}</span>
            <IconMapPin class="w-[20px] sm:w-[30px]" />
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <ButtonConnection :is-connected="isConnected" @remove="removeConnection" v-if="!props.isMe" />

          <button
            class="text-[14px] sm:text-[16px] md:text-[18px] cursor-not-allowed text-light items-center bg-primary mt-2 py-1 sm:py-2 pl-3 pr-5 rounded-md flex gap-x-2"
            v-else
          >
            <IconPeople class="w-[20px] sm:w-[28px] fill-light" />
            My Connections
          </button>

          <ButtonSendMessage :profile="props.profile" v-if="!isMe" />
        </div>
      </div>
    </div>

    <div class="flex flex-col items-start w-full pt-3 md:pt-6 pl-3 sm:pl-8 md:pl-3">
      <h1 class="text-[16px] sm:text-[18px] font-semibold text-nowrap">My Socials:</h1>
      <ProfileSocials :user="props.profile" />
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

<style lang="scss" scoped></style>
