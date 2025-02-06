<script lang="ts" setup>
import { ref } from 'vue';
import { IconMagnify } from '../icons';

const isFocused = ref(false);
const isHovered = ref(false);
</script>

<template>
  <div class="relative overflow-y-visible group py-[1px] flex items-center rounded-full bg-slate-200">
    <IconMagnify class="absolute left-2 w-[30px] fill-gray-400 group-hover:fill-gray-800" />
    <input
      @focusin="isFocused = true"
      @focusout="isFocused = false"
      class="w-full py-2 pl-10 rounded-full text-primary"
      placeholder="Looking for..."
    />

    <div
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      class="absolute w-full top-[50px] px-3 py-2 bg-white border border-gray-300 dark:bg-dark rounded-2xl"
      v-if="isFocused || isHovered"
    >
      <h1 class="text-[14px] text-gray-700 dark:text-white">Search results</h1>
      <ul>
        <li>...</li>
      </ul>
    </div>
  </div>
</template>
