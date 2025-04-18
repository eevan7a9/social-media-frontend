<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import NavbarTop from '@/components/layouts/NavbarTop.vue';
import MainFooter from '@/components/layouts/MainFooter.vue';
import { computed, onMounted, provide, ref } from 'vue';
import AlertDefault from './components/common/alerts/AlertDefault.vue';
import { useFriendsStore } from './stores/friends';
import { useGroupsStore } from './stores/groups';
import { useFeedsStore } from './stores/feeds';
import LoadingPage from './components/common/loading/LoadingPage.vue';
import { useActivitiesStore } from './stores/activities';
import { useStoriesStore } from './stores/stories';
import { fetchFeeds } from './shared/services/feedService';
import { fetchFriends } from './shared/services/friendService';
import { fetchGroups } from './shared/services/groupService';
import { fetchStories } from './shared/services/storyService';
import { fetchActivities } from './shared/services/activityService';
import AlertConfirmation from './components/common/alerts/AlertConfirmation.vue';

const feedsStore = useFeedsStore();
const friendsStore = useFriendsStore();
const groupsStore = useGroupsStore();
const activitiesStore = useActivitiesStore();
const storiesStore = useStoriesStore();

const route = useRoute();
const isDetailsView = computed(() => route.name === 'feedDetailView');

const alertConfirmationRef = ref<InstanceType<typeof AlertConfirmation> | null>(null);
provide('alertConfirmationRef', alertConfirmationRef);

onMounted(() => {
  fetchFeeds().then((res) => {
    feedsStore.setFeeds(res.posts);
  });
  fetchFriends().then((res) => {
    friendsStore.setFriends(res.friends);
    friendsStore.setInitialFetchDone(true);
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

  <NavbarTop :class="isDetailsView ? 'z-0' : 'z-20'" />
  <main class="bg-light dark:bg-dark text-dark dark:text-light h-full min-h-screen pb-4 relative z-0">
    <RouterView />
  </main>
  <MainFooter class="border-t border-gray-300" />
</template>

<style scoped></style>
