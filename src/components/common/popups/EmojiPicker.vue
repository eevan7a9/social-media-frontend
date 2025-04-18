<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const showPopup = ref(false);
const pickerContainer = ref<HTMLElement | null>(null);

const others = ['🔥', '🚀', '👍', '👎', '✌️', '👋', '👌', '🙌', '💯', '❤️', '✅', '✨', '⭐'];
const smiley = [
  '😀',
  '😊',
  '🙄',
  '😒',
  '😑',
  '🤣',
  '😂',
  '😍',
  '🥰',
  '🤔',
  '🫣',
  '🫡',
  '🤫',
  '🥳',
  '😎',
  '🤓',
  '🤪',
  '😛',
  '😝',
  '🤑',
  '😪',
  '😴',
  '🥱',
  '😔',
  '😤',
  '😡',
  '🤬',
];

const emit = defineEmits(['select']);

const togglePopup = () => {
  showPopup.value = !showPopup.value;
};

const selectEmoji = (emoji: string) => {
  emit('select', emoji);
  console.log('selected :', emoji);
  showPopup.value = false;
};

const handleClickOutside = (e: Event) => {
  if (pickerContainer.value && !pickerContainer.value.contains(e.target as Node)) {
    showPopup.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="relative" ref="pickerContainer">
    <slot name="button" :togglePopup="togglePopup">
      <button @click="togglePopup" class="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">
        😊 Pick Emoji
      </button>
    </slot>

    <div
      v-if="showPopup"
      class="absolute z-10 mt-2 p-2 lg:p-3 bg-white border border-slate-400 shadow-lg rounded-lg"
    >
      <p class="py-2 px-1 font-light">Smiley Emoji</p>
      <div class="w-[300px] md:max-w-[450px] grid grid-cols-5 gap-2">
        <button
          v-for="smile in smiley"
          :key="smile"
          @click="selectEmoji(smile)"
          class="cursor-pointer text-2xl lg:text-3xl hover:scale-110 transition-transform"
        >
          {{ smile }}
        </button>
      </div>

      <p class="py-2 px-1 font-light">Other Emoji</p>
      <div class="w-[300px] md:max-w-[450px] grid grid-cols-5 gap-2">
        <button
          v-for="other in others"
          :key="other"
          @click="selectEmoji(other)"
          class="cursor-pointer text-2xl lg:text-3xl hover:scale-110 transition-transform"
        >
          {{ other }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional styling tweaks */
</style>
