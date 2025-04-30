<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const title = ref('');
const message = ref('');
const image = ref('');

function cancel() {
  visible.value = false;
}

defineExpose({
  showRestricted(newTitle: string, newMessage: string, img?: string): Promise<boolean> {
    title.value = newTitle;
    message.value = newMessage;
    image.value = img || '';
    visible.value = true;

    return new Promise<boolean>((resolve) => {
      resolve(true);
    });
  },
});
</script>

<template>
  <Transition name="fade">
    <div
      v-if="visible"
      @click="cancel"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        @click.stop
        class="bg-white dark:bg-black dark:text-white rounded-lg shadow-xl p-6 w-[90%] max-w-[900px]"
      >
        <div class="flex flex-col justify-center items-center">
          <h1 class="xs:text-[24px] md:text-[32px] font-bold">{{ title || 'Restricted Content' }}</h1>
          <img :src="image" alt="image" class="w-full max-w-[800px] max-h-[400px]" v-if="image" />
          <p class="text-[14px] xs:text-[20px] py-3 text-danger">{{ message }}</p>
        </div>

        <div class="flex justify-end">
          <button
            @click="cancel"
            class="text-[20px] border border-gray-300 rounded-xl py-1 px-3 sm:px-8 font-bold text-gray-800 dark:text-gray-200 hover:underline cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
