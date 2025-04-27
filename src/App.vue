<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import NavbarTop from '@/components/layouts/NavbarTop.vue';
import MainFooter from '@/components/layouts/MainFooter.vue';
import { computed, onMounted, provide, ref } from 'vue';
import AlertDefault from './components/common/alerts/AlertDefault.vue';
import { useUsersStore } from './stores/users';
import { useGroupsStore } from './stores/groups';
import { useFeedsStore } from './stores/feeds';
import LoadingPage from './components/common/loading/LoadingPage.vue';
import { useActivitiesStore } from './stores/activities';
import { useStoriesStore } from './stores/stories';
import { fetchFeeds } from './shared/services/feedService';
import { fetchGroups } from './shared/services/groupService';
import { fetchStories } from './shared/services/storyService';
import { fetchActivities } from './shared/services/activityService';
import AlertConfirmation from './components/common/alerts/AlertConfirmation.vue';
import ChatContainer from './components/chat/ChatContainer.vue';
import { fetchUsers } from './shared/services/userService';
import IconMenu from './components/icons/IconMenu.vue';
import MobileNavSidebar from './components/layouts/MobileNavSidebar.vue';

const feedsStore = useFeedsStore();
const usersStore = useUsersStore();
const groupsStore = useGroupsStore();
const activitiesStore = useActivitiesStore();
const storiesStore = useStoriesStore();

const route = useRoute();
const isDetailsView = computed(() =>
  [
    'feedDetailView',
    'groupDetailView',
    'storyDetailView',
    'profileFeedDetailView',
    'profileGroupDetailView',
  ].includes(route.name?.toString() || ''),
);

const alertConfirmationRef = ref<InstanceType<typeof AlertConfirmation> | null>(null);
provide('alertConfirmationRef', alertConfirmationRef);

const showMobileNav = ref(false);

function toggleSideNav() {
  console.log('Menu click');
  showMobileNav.value = !showMobileNav.value;
}

onMounted(() => {
  fetchFeeds().then((res) => {
    feedsStore.setFeeds(res.posts);
  });
  fetchUsers().then((res) => {
    usersStore.setUsers(res.users);
  });
  fetchGroups().then((res) => {
    groupsStore.setGroups(res.groups);
    groupsStore.setInitialFetchDone(true);
  });
  fetchStories().then((e) => {
    storiesStore.setStories(e.stories);
    storiesStore.setInitialFetchDone(true);
  });
  fetchActivities().then((e) => {
    activitiesStore.setActivities(e.activities);
    activitiesStore.setInitialFetchDone(true);
  });
});
</script>

<template>
  <LoadingPage class="z-50" />
  <AlertDefault class="z-50" />
  <AlertConfirmation class="z-50" ref="alertConfirmationRef" />

  <NavbarTop :class="isDetailsView ? 'z-0' : 'z-20'">
    <template #menuBtn>
      <button
        @click="toggleSideNav"
        class="md:hidden p-1 hover:bg-slate-100 cursor-pointer dark:hover:bg-slate-800"
      >
        <IconMenu class="w-[40px] fill-primary" />
      </button>
    </template>
  </NavbarTop>
  <MobileNavSidebar class="z-40" v-model="showMobileNav" />

  <main class="bg-light dark:bg-dark text-dark dark:text-light h-full min-h-screen pb-4 relative z-0">
    <RouterView class="z-0" />
  </main>

  <ChatContainer class="fixed bottom-0 z-20" />
  <MainFooter class="border-t border-gray-300" />
</template>

<style scoped></style>
