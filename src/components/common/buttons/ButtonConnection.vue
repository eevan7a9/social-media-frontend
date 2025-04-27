<script lang="ts" setup>
import { IconCheckDecagram, IconClockOutline, IconPlus } from '@/components/icons';
import { ref } from 'vue';

const props = defineProps<{
  isConnected: boolean;
  labelNotConnected?: string;
}>();

const emits = defineEmits(['remove']);

const pending = ref(false);

function toggleButton() {
  if (props.isConnected) {
    return emits('remove');
  }
  pending.value = true;
}
</script>

<template>
  <button
    @click="toggleButton"
    class="cursor-pointer text-[14px] sm:text-[16px] md:text-[18px] mt-2 py-1 sm:py-2 pl-3 pr-5 rounded-md flex items-center gap-x-2"
    :class="{
      'bg-primary text-white': props.isConnected,
      'border border-primary': !props.isConnected,
      'border border-gray-600': pending,
    }"
  >
    <IconCheckDecagram class="w-[28px] fill-light" v-if="props.isConnected" />
    <IconPlus class="w-[20px] sm:w-[26px] fill-primary" v-if="!props.isConnected && !pending" />
    <IconClockOutline class="w-[20px] sm:w-[26px] fill-primary" v-if="!props.isConnected && pending" />

    <span v-if="pending && !isConnected">Pending...</span>
    <span v-else>{{ props.isConnected ? 'Connected' : props.labelNotConnected || 'Add Connection' }}</span>
  </button>
</template>
