<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ProfileIntro from '@/components/profile/ProfileIntro.vue';
import ProfileSimilar from '@/components/profile/ProfileSimilar.vue';
import ProfileSummary from '@/components/profile/ProfileSummary.vue';
import ButtonDefault from '@/components/common/buttons/ButtonDefault.vue';
import { IconCommunity } from '@/components/icons';
import { useGroupsStore } from '@/stores/groups';
import GroupListItem from '@/components/group/GroupListItem.vue';
import { useAuthStore } from '@/stores/auth';
import type { User, UserAuth } from '@/shared/types/User';
import ProfileConnections from '@/components/profile/ProfileConnections.vue';
import type { Group } from '@/shared/types/Group';
import FeedsList from '@/components/feeds/FeedsList.vue';
import useLoading from '@/composables/loading';
import ProfileCover from '@/components/profile/ProfileCover.vue';
import { useUsersStore } from '@/stores/users';

const router = useRouter();
const route = useRoute();

const loading = useLoading();
const auth = useAuthStore();
const groupsStore = useGroupsStore();
const usersStore = useUsersStore();

const userId = ref(route.query.user);
const isMe = ref(false);
const profile = ref<UserAuth | User | null>(null);
const groups = ref<Group[]>([]);

const users = computed<User[]>(() => usersStore.list);
const connections = computed<User[]>(() => {
  if (isMe.value) {
    return users.value.filter((user) => auth.authUser?.connections?.includes(user.id));
  }
  return users.value.filter((user) => profile.value?.connections?.includes(user.id));
});

function findUser() {
  isMe.value = userId.value === auth.authUser?.id || !userId.value;
  profile.value = users.value.find(({ id }) => id === (userId.value || auth.authUser?.id)) || null;
  groups.value = groupsStore.list.filter((group) => profile.value?.groups?.includes(group.id));

  loading.hide();
  if (!profile.value) {
    router.replace('/');
  }
  window.scrollTo({ behavior: 'smooth', top: 0 });
}

watch(
  () => route.query.user,
  () => {
    userId.value = route.query.user;
    findUser();
  },
);

onMounted(() => findUser());
</script>

<template>
  <div>
    <ProfileCover class="z-0" :image="profile?.imageConver || ''" />

    <div class="z-10" v-if="profile">
      <div class="w-full max-w-screen-lg mx-auto rounded-b-sm bg-white dark:bg-black pb-5 px-3">
        <ProfileIntro :socials="profile.socials || []" :profile="profile" :is-me="isMe" />
      </div>

      <div class="w-full max-w-screen-lg mx-auto grid md:grid-cols-12 gap-3 md:gap-5 mt-3 md:mt-6">
        <div class="w-full md:col-span-7">
          <ProfileSummary
            :is-me="isMe"
            class="max-w-full rounded-md bg-white dark:bg-black px-3 lg:px-5 xl:px-8 py-3 lg:py-5"
          />

          <div class="py-5 lg:px-10">
            <FeedsList :user-id="profile.id">
              <template #empty>
                <div class="flex flex-col items-center justify-center" v-if="isMe">
                  <p class="text-center text-[24px] max-w-[380px] font-light">
                    Looks a little empty here... Create your first post!
                  </p>
                  <RouterLink to="/">
                    <ButtonDefault class="py-2 rounded-md px-5 mt-5">Go To Feeds</ButtonDefault>
                  </RouterLink>
                </div>
              </template>
            </FeedsList>
          </div>
        </div>

        <div class="w-full md:col-span-5">
          <ProfileSimilar class="rounded-md" />
          <ProfileConnections class="dark:bg-black" :connections="connections" />

          <div class="bg-white dark:bg-black mt-3 md:mt-5 py-3 md:py-5 px-3 md:px-5 rounded-md">
            <h1 class="text-[16px] md:text-[20px] font-bold">
              My Groups
              <component :is="IconCommunity" fill="#8536b9" class="max-w-[30px] inline-block" />
            </h1>

            <ul class="flex flex-col gap-y-4 mt-4">
              <template v-for="group of groups" :key="group.id">
                <GroupListItem :group="group" />
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <RouterView class="z-20" />
  </div>
</template>

<style lang="scss" scoped></style>
