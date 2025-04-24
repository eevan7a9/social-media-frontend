<script setup lang="ts">
import GroupMembers from '@/components/group/GroupMembers.vue';
import GroupPosts from '@/components/group/GroupPosts.vue';
import { IconBell, IconCheckDecagram } from '@/components/icons';
import { useAlert } from '@/composables/alert';
import { AlertType } from '@/shared/enums/Alert';
import type { Group } from '@/shared/types/Group';
import { useAuthStore } from '@/stores/auth';
import { useGroupsStore } from '@/stores/groups';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const groupsStore = useGroupsStore();
const authStore = useAuthStore();
const alert = useAlert();

const group = computed<Group | undefined>(() =>
  groupsStore.list.find((group) => group.id === route.params.id),
);
const isSubsribed = ref(authStore.authUser?.id && group.value?.membersId?.includes(authStore.authUser?.id));

function goBack() {
  router.back();
}

function subscribed() {
  isSubsribed.value = !isSubsribed.value;
  if (isSubsribed.value) {
    alert.showAlert("You're now a member of " + group.value?.name, AlertType.Info, 6000);
  } else {
    alert.showAlert(`You’ve left ${group.value?.name}. Come back anytime!`, AlertType.Danger, 6000);
  }
}

onMounted(() => {
  if (!group.value) {
    router.replace('/');
  }
});
</script>

<template>
  <div
    @click="goBack()"
    class="bg-gray-900/15 p-4 fixed top-0 h-svh right-0 left-0 bottom-0 flex justify-center md:items-center sm:py-16 md:py-0"
  >
    <div class="w-full flex justify-center sm:mt-4 pointer-events-none relative">
      <article
        class="max-w-[1200px] w-full flex flex-col md:flex-row gap-2 md:gap-3 grow sm:max-h-[90dvh] pointer-events-auto"
      >
        <div @click.stop class="h-full w-full bg-light dark:bg-dark rounded-xl">
          <div class="h-[230px] rounded-t-xl">
            <div class="size-[180px] bg-white/20 border-white border-[4px] translate-y-[120px] absolute translate-x-8 rounded-xl">
              <img :src="group?.image" alt="group-cover" class="w-full h-full object-cover rounded-xl" />
            </div>
            <img :src="group?.imageCover" class="rounded-t-xl w-full h-full object-cover" alt="group-cover" />
          </div>

          <div class="bg-white dark:bg-black flex flex-col sm:flex-row sm:gap-3">
            <div class="w-full max-w-[240px] px-3 xs:pb-3 pt-[90px]">
              <button
                @click="subscribed()"
                class="cursor-pointer rounded-xl flex items-center justify-center gap-2 py-2 md:py-3 w-full md:text-[18px] text-white"
                :class="
                  isSubsribed ? 'bg-primary font-black' : 'bg-transparent border border-primary !text-primary'
                "
              >
                <IconCheckDecagram class="w-[32px] fill-white" v-if="isSubsribed" />
                <IconBell class="w-[32px] fill-primary" v-else />
                {{ isSubsribed ? 'Subscribed' : 'Subscribe' }}
              </button>
            </div>

            <div class="w-full px-3 xs:py-3">
              <h1
                class="text-[20px] text-light dark:text-dark sm:text-[28px] font-black sm:absolute sm:-translate-y-[54px] dark-text-stroke"
              >
                {{ group?.name }}
              </h1>

              <div class="relative max-h-[130px] md:max-h-[200px] overflow-y-auto">
                <p class="">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel adipisci, vero alias aliquam
                  mollitia commodi quisquam maiores ratione velit, quae eum ipsum ex. Corporis optio, nostrum
                  ipsam harum vero quam, ipsa quos illum dignissimos unde saepe. Minus nihil dignissimos
                  facere ducimus sunt inventore, doloribus labore sed quaerat veritatis. Distinctio,
                  blanditiis?
                </p>
              </div>
            </div>
          </div>

          <GroupPosts :posts-id="group?.postsId || []" />
        </div>

        <div
          @click.stop
          class="bg-light dark:bg-dark w-full max-w-[380px] overflow-hidden rounded-xl hidden sm:block"
        >
          <GroupMembers :members-id="group?.membersId" v-if="group?.membersId" />
        </div>
      </article>
    </div>
  </div>
</template>
