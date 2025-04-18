<script lang="ts" setup>
import { ButtonDefault } from '@/components/common/buttons';
import { IconImage } from '@/components/icons';
import { ref } from 'vue';

const emits = defineEmits<{ setImage: [url: string]; close: [] }>();

const fileInput = ref(null);
const isDragging = ref(false);
const previewUrl = ref('');

function onDragOver() {
  isDragging.value = true;
}

function onDragLeave() {
  isDragging.value = false;
}

function onDrop(event: DragEvent) {
  isDragging.value = false;
  const file = event?.dataTransfer?.files[0];
  if (file) {
    handleFile(file);
  }
}

function onFileChange(event: Event) {
  const target = event?.target as HTMLInputElement;
  if (target.files) {
    const file = target.files[0];
    if (file) handleFile(file);
  }
}

function handleFile(file: File) {
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}

function setImage(): void {
  console.log('set Image...');
  emits('setImage', previewUrl.value);
  emits('close');
}
</script>

<template>
  <div
    @click.stop="emits('close')"
    class="z-50 bg-dark/30 w-screen h-screen fixed top-0 left-0 flex justify-center items-center"
  >
    <article @click.stop class="bg-light dark:bg-dark pt-4 px-3 md:px-5 rounded-xl w-full max-w-[900px]">
      <h1>Upload Image</h1>
      <div
        @dragover.prevent="onDragOver"
        @dragleave="onDragLeave"
        @drop.prevent="onDrop"
        class="relative mt-3 min-h-[300px] flex justify-center flex-col items-center rounded-lg"
        :class="previewUrl ? 'bg-slate-300' : 'py-3 bg-slate-200'"
      >
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          @change="onFileChange"
          class="z-50 absolute h-full w-full opacity-0 cursor-pointer"
        />
        <img v-if="previewUrl" :src="previewUrl" alt="Preview" class="block h-auto w-full max-w-[600px]" />

        <IconImage class="size-[100px] md:size-[250px] lg:size-[350px] fill-slate-600" v-if="!previewUrl" />
        <p class="absolute bottom-8 text-[16px] md:text-[20px] lg:text-[24px]" v-if="!previewUrl">
          <strong>Drag</strong> & <strong>Drop</strong> or <strong>Click</strong> to Select a photo to upload.
        </p>
      </div>

      <div class="py-3 lg:py-4 flex justify-center">
        <ButtonDefault
          :disabled="!previewUrl"
          :class="!previewUrl ? '!cursor-not-allowed' : ''"
          @click="setImage()"
          class="px-5 md:px-7 py-2 lg:py-3 lg:px-24 rounded-lg md:text-[20px]"
        >
          Confirm
        </ButtonDefault>
      </div>
    </article>
  </div>
</template>
