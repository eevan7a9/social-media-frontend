<script lang="ts" setup>
import type { GroupItem } from '@/shared/types/Group';

defineProps<{ group: GroupItem }>();
</script>

<template>
  <li
    :key="group.title"
    class="text-[14px] font-normal flex items-center gap-x-3 cursor-pointer transition-all divide-purple-300 ease-in-out hover:bg-secondary/5"
  >
    <img src="https://placehold.co/100x100" class="w-[50px] h-[50px] rounded-sm" />
    <div class="flex flex-col max-w-[200px]">
      <span>{{ group.title }}</span>
      <small class="text-[12px] text-gray-700 text-ellipsis line-clamp-1">{{ group.desc }} </small>
    </div>
  </li>
</template>
