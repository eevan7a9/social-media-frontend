<script lang="ts" setup>
import type { ActivityItem } from '@/shared/types/Activity';
import { relativeDateFormat } from '@/shared/utils/date';
import { useRouter } from 'vue-router';

defineProps<{ activity: ActivityItem }>();

const router = useRouter();

function viewActivity(id: string, target: string) {
  router.push(`${target}/${id}`);
}
</script>

<template>
  <li
    @click="viewActivity(activity.targetId, activity.target)"
    class="flex items-center gap-x-3 py-2 cursor-pointer px-3 rounded-md hover:bg-slate-200/50 dark:hover:bg-slate-600/30"
  >
    <img
      :src="activity.image || activity.author.image || 'https://placehold.co/100x100'"
      class="w-[60px] h-[60px] rounded-md"
    />
    <div class="flex flex-col">
      <span class="text-[14px] font-medium">{{ activity.title }}</span>
      <span class="text-[13px] font-light text-ellipsis line-clamp-1">
        {{ activity.desc }}
      </span>
      <small class="text-[12px] text-gray-600 dark:text-gray-400" v-if="activity.created">
        {{ relativeDateFormat(activity.created) }}
      </small>
    </div>
  </li>
</template>
