<script lang="ts" setup>
import type { Group } from '@/shared/types/Group';
import { useRouter } from 'vue-router';

const props = defineProps<{ group: Group }>();

const router = useRouter();

function viewGroupDetails() {
  router.push('group/' + props.group.id);
}
</script>

<template>
  <li
    @click="viewGroupDetails()"
    class="text-[14px] font-normal flex items-center gap-x-3 cursor-pointer transition-all divide-purple-300 ease-in-out hover:bg-secondary/5"
  >
    <img :src="group.image || 'https://placehold.co/100x100'" class="w-[50px] h-[50px] rounded-sm" />

    <div class="flex flex-col max-w-[200px]">
      <span class="font-medium">
        {{ props.group?.name }}
      </span>

      <small class="text-[12px] text-gray-700 text-ellipsis line-clamp-1 font-light">{{ group.desc }} </small>
    </div>
  </li>
</template>
