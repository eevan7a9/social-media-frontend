<script lang="ts" setup>
import type { ActivityItem } from '@/shared/types/Activity';

defineProps<{ activity: ActivityItem }>();
</script>

<template>
  <li class="flex items-center gap-x-3 py-2 cursor-pointer px-3 rounded-md hover:bg-slate-200/50">
    <img src="https://placehold.co/100x100" class="w-[60px] h-[60px] rounded-full" />
    <div class="flex flex-col">
      <span class="text-[14px]">{{ activity.time }}</span>
      <span class="text-[13px] font-light text-ellipsis line-clamp-1">
        {{ activity.desc }}
      </span>
      <small class="text-[12px] text-gray-600">
        {{ activity.time }}
      </small>
    </div>
  </li>
</template>
