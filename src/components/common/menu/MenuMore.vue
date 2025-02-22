<script lang="ts" setup>
import { IconHorizontalDots, IconVerticalDots } from '@/components/icons';
import { ref, watch } from 'vue';

defineProps<{ vertical?: boolean; iconClass?: string }>();

const show = ref(false);
const moreContainer = ref<HTMLElement>();
function toggle() {
  show.value = !show.value;
}

function detectOutsideClick(e: MouseEvent) {
  if (!moreContainer.value?.contains(e.target as Node)) {
    show.value = false;
  }
}

function close() {
  show.value = false;
}

function open() {
  show.value = true;
}

defineExpose({
  close,
  open,
});

watch(show, (val) => {
  if (val) {
    setTimeout(() => document.addEventListener('click', detectOutsideClick), 500);
  } else {
    document.removeEventListener('click', detectOutsideClick);
  }
});
</script>

<template>
  <button @click="toggle()" class="p-1 relative hover:bg-slate-200 rounded-full cursor-pointer">
    <IconVerticalDots class="w-[30px]" :class="iconClass" v-if="vertical" />
    <IconHorizontalDots class="w-[30px]" :class="iconClass" v-else />
    <div
      ref="moreContainer"
      @click.stop
      class="absolute top-[40px] right-0 border border-gray-200 min-w-[200px] rounded-md bg-white"
      v-if="show"
    >
      <slot></slot>
    </div>
  </button>
</template>
