<script lang="ts" setup>
import { ButtonDefault } from '../common/buttons';
import { ref } from 'vue';
import { IconEmoji, IconImage, IconMapPin, IconLink } from '../icons';

const myContent = ref('');

function submit() {
  myContent.value = '';

  console.log('submit', myContent.value);
}
</script>
<template>
  <div
    class="bg-white border border-gray-200 dark:bg-dark px-3 py-2 lg:py-4 rounded-md lg:rounded-xl flex gap-x-3"
  >
    <div>
      <span class="max-w-[70px] lg:max-w-[80px] flex border-2 border-primary rounded-full">
        <img src="https://placehold.co/100x100/0e4281/FFF" class="rounded-full" />
      </span>
    </div>
    <div class="w-full">
      <div>
        <form @submit.prevent="submit()">
          <textarea
            v-model="myContent"
            rows="2"
            class="bg-slate-100 w-full rounded-md py-2 px-3 resize-none placeholder:text-[14px]"
            placeholder="What is on your mind?"
            maxlength="140"
          ></textarea>

          <div class="flex justify-between items-center pt-2">
            <div class="flex items-center gap-x-2">
              <button class="p-1 cursor-pointer bg-slate-500/10 rounded-full h-[30px] w-[30px]">
                <IconImage class="fill-primary/70 hover:fill-primary" />
              </button>
              <small class="hidden lg:block text-[12px] text-gray-600 capitalize mr-2">upload</small>

              <button class="p-1 cursor-pointer bg-warning/15 rounded-full h-[30px] w-[30px]">
                <IconEmoji class="fill-warning/70 hover:fill-warning" />
              </button>
              <small class="hidden lg:block text-[12px] text-gray-600 capitalize mr-2">Feelings</small>

              <button class="p-1 cursor-pointer bg-secondary/10 rounded-full h-[30px] w-[30px]">
                <IconLink class="fill-secondary/70 hover:fill-secondary" /></button
              ><small class="hidden lg:block text-[12px] text-gray-600 capitalize mr-2">Link</small>

              <button class="p-1 cursor-pointer bg-green-400/20 rounded-full h-[30px] w-[30px]">
                <IconMapPin class="fill-success/70 hover:fill-success" /></button
              ><small class="hidden lg:block text-[12px] text-gray-600 capitalize mr-2">location</small>
            </div>

            <ButtonDefault type="submit" class="!rounded-full px-5 lg:px-6 py-1">
              <span class="text-[15px] font-light">Post</span>
            </ButtonDefault>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
