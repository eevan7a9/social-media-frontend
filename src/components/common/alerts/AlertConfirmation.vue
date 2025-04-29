<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const title = ref('');
const message = ref('');
let resolvePromise: ((confirmed: boolean) => void) | null = null;

function confirm() {
  visible.value = false;
  resolvePromise?.(true);
}

function cancel() {
  visible.value = false;
  resolvePromise?.(false);
}

defineExpose({
  show(newTitle: string, newMessage: string): Promise<boolean> {
    title.value = newTitle;
    message.value = newMessage;
    visible.value = true;

    return new Promise<boolean>((resolve) => {
      resolvePromise = resolve;
    });
  },
});
</script>

<template>
  <Transition name="fade">
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="bg-white dark:bg-black dark:text-white rounded-lg shadow-xl p-6 w-[90%] max-w-md">
        <h2 class="text-lg font-semibold mb-2">{{ title }}</h2>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">{{ message }}</p>

        <div class="flex justify-end gap-3">
          <button @click="cancel" class="text-gray-500 dark:text-gray-200 hover:underline cursor-pointer">
            Cancel
          </button>
          <button
            @click="confirm"
            class="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 cursor-pointer"
          >
            Confirm
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
