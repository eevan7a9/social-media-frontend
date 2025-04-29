<script lang="ts" setup>
import { ref, watch } from 'vue';
import { IconMagnify } from '../icons';

const isFocused = ref(false);
const isHovered = ref(false);
const showDropdownSearch = ref(false);
const searchContainerRef = ref<HTMLElement>();
const searchText = ref('');

function detectOutsideClick(e: MouseEvent) {
  if (!searchContainerRef.value?.contains(e.target as Node)) {
    showDropdownSearch.value = false;
  }
}

function toggleDropdownSearch() {
  if (1080 > window.innerWidth) {
    showDropdownSearch.value = !showDropdownSearch.value;
  }
}

function search() {
  console.log(searchText.value);
  searchText.value = '';
}

watch(showDropdownSearch, (val) => {
  if (val) {
    setTimeout(() => document.addEventListener('click', detectOutsideClick), 500);
  } else {
    document.removeEventListener('click', detectOutsideClick);
  }
});
</script>

<template>
  <div
    ref="searchContainerRef"
    class="relative overflow-y-visible group px-1 xs:px-3 md:px-0 py-[1px] flex items-center rounded-full"
  >
    <div class="contents" @click="toggleDropdownSearch">
      <IconMagnify
        class="md:absolute left-2 w-[30px] fill-gray-400 group-hover:fill-gray-800 dark:group-hover:fill-white"
      />
      <button
        class="hidden sm:block cursor-pointer text-[13px] text-slate-600 md:hidden"
        v-if="!showDropdownSearch"
      >
        Search...
      </button>
    </div>

    <div
      class=""
      :class="{
        'absolute top-[50px] -left-[150px] border border-primary py-2 bg-slate-200 dark:bg-slate-700 w-[360px] rounded-lg':
          showDropdownSearch,
        ' hidden md:block': !showDropdownSearch,
      }"
    >
      <input
        v-model="searchText"
        @keydown.enter="search"
        @focusin="isFocused = true"
        @focusout="isFocused = false"
        class="w-full outline-0 py-2 pl-10 rounded-full text-primary bg-slate-200 dark:bg-slate-700 dark:placeholder:text-slate-300 dark:text-white md:min-w-[400px]"
        placeholder="Looking for..."
      />
    </div>

    <div
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      class="absolute w-[360px] top-[120px] md:w-full md:top-[50px] px-3 py-2 bg-white border border-gray-300 dark:bg-dark rounded-2xl"
      v-if="isFocused || isHovered"
    >
      <h1 class="text-[14px] text-gray-700 dark:text-white">Search results</h1>
      <ul>
        <li>...</li>
      </ul>
    </div>
  </div>
</template>
