<script lang="ts" setup>
import { ref } from 'vue';
import ButtonDefault from '@/components/common/buttons/ButtonDefault.vue';
import { IconCheckCircle, IconPencil } from '@/components/icons';

const props = defineProps<{ isMe: boolean }>();

const intro = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ex eius nam, labore ab expedita amet itaque fugiat deleniti dicta, blanditiis natus laborum. Ab repellat amet voluptate nesciunt labore voluptatem?`;
const editSummary = ref(false);
</script>

<template>
  <div class="flex flex-col items-start">
    <h1 class="text-[16px] md:text-[20px] font-bold">Summary</h1>

    <p class="font-light w-full h-[80px] overflow-y-auto" v-if="editSummary === false">
      {{ intro || 'Nothing to see here...' }}
    </p>

    <textarea
      class="resize-none w-full h-[80px] bg-slate-100 p-2 border rounded-xl border-primary"
      v-model="intro"
      maxlength="250"
      v-else
    >
    </textarea>

    <ButtonDefault
      class="text-[18px] mt-2 py-2 pl-3 pr-5 rounded-md flex gap-x-2"
      @click="editSummary = !editSummary"
      v-if="props.isMe && !editSummary"
    >
      <IconPencil class="fill-white w-[24px]" /> Edit
    </ButtonDefault>

    <button
      class="text-[18px] text-white cursor-pointer mt-2 py-2 pl-3 pr-5 rounded-md flex gap-x-2 bg-success hover:bg-green-600"
      @click="editSummary = !editSummary"
      v-if="props.isMe && editSummary"
    >
      <IconCheckCircle class="fill-white w-[24px]" /> Save
    </button>
  </div>
</template>
