<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { IconFlag } from '../icons';
import { useReport } from '@/composables/report';
import { ref } from 'vue';
import type { User } from '@/shared/types/User';
import MenuMore from '../common/menu/MenuMore.vue';

const report = useReport();
const router = useRouter();

const props = defineProps<{ user: User }>();

const menuMore = ref<InstanceType<typeof MenuMore> | null>(null);

function viewUser(id: string): void {
  router.push({ path: '/profile', query: { user: id } });
}

function reportUser(): void {
  report.user(props.user.id);
  menuMore.value?.close();
}
</script>
<template>
  <li class="p-3 bg-white dark:bg-dark rounded-md flex gap-3 items-center">
    <img
      :src="props.user.image"
      class="h-[60px] w-[60px] border dark:border-light object-contain rounded-full"
      alt="user-profile"
      @click="viewUser(props.user.id)"
    />
    <div class="flex flex-col hover:underline cursor-pointer" @click="viewUser(props.user.id)">
      <span>{{ props.user.username }}</span>
      <small class="text-gray-600 dark:text-gray-400">{{ props.user.company }} | {{ props.user.occupation }}</small>
    </div>
    <!--
            <button class="absolute group right-4 hover:bg-slate-200/50 p-3 rounded-full cursor-pointer">
              <IconVerticalDots class="w-[24px] opacity-60 group-hover:opacity-100" fill="#333" />
            </button> -->

    <MenuMore
      ref="menuMore"
      vertical
      class="!size-[34px] ml-auto py-0 mr-0 fill-gray-500 hover:fill-gray-800 dark:hover:fill-gray-200"
    >
      <ul class="bg-white dark:bg-black py-1 flex flex-col text-[14px] z-50">
        <li class="flex items-center p-2 hover:bg-slate-200 dark:hover:bg-slate-600" @click="reportUser()">
          <IconFlag class="w-[30px] mr-2" />
          <span>Report</span>
        </li>
      </ul>
    </MenuMore>
  </li>
</template>
