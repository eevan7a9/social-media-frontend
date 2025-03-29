<script lang="ts" setup>
import { IconCheckDecagram, IconPlus } from '@/components/icons';

const props = defineProps<{
  isConnected: boolean;
  labelNotConnected?: string;
}>();
</script>

<template>
  <button
    class="cursor-pointer text-[14px] sm:text-[16px] md:text-[18px] mt-2 py-1 sm:py-2 pl-3 pr-5 rounded-md flex gap-x-2"
    :class="props.isConnected ? 'bg-primary text-white' : 'border border-primary'"
  >
    <IconCheckDecagram class="w-[28px] fill-light" v-if="props.isConnected" />
    <IconPlus class="w-[20px] sm:w-[26px] fill-primary" v-else />
    {{ props.isConnected ? 'Connected' : props.labelNotConnected || 'Add Connection' }}
  </button>
</template>
