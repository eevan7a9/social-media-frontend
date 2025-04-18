<script lang="ts" setup>
import {
  IconBookmarkDefault,
  IconCheckDecagram,
  IconCloseOctagon,
  IconShare,
  IconThumbUp,
} from '@/components/icons';
import { useAlert } from '@/composables/alert';
import { AlertType } from '@/shared/enums/Alert';

const { message, type, isVisible } = useAlert();
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isVisible"
      :class="`fixed bottom-5 text-dark dark:text-light dark:bg-dark/80 right-5 py-4 px-5 rounded-lg  text-[16px] font-semibold z-50 shadow alert-${type}`"
    >
      <div class="flex items-center gap-x-2">
        <IconThumbUp filled class="w-[30px] fill-sky-600 scale-x-[-1]" v-if="type === AlertType.Liked" />
        <IconShare class="w-[30px] fill-warning" v-if="type === AlertType.Shared" />
        <IconBookmarkDefault filled class="w-[30px] fill-accent" v-if="type === AlertType.Saved" />

        <IconCheckDecagram filled class="w-[30px] fill-light" v-if="type === AlertType.Success" />
        <IconCloseOctagon class="w-[30px] fill-light" v-if="type === AlertType.Danger" />

        {{ message }}
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.alert-default {
  background: rgb(245, 245, 245);
  color: black;
}
.alert-info {
  background: #3498db;
  color: white;
}
.alert-success {
  background: #2ecc71;
  color: white;
}
.alert-danger {
  background: #e74c3c;
  color: white;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
