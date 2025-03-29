<script lang="ts" setup>
import MenuMore from '@/components/common/menu/MenuMore.vue';
import { IconFlag } from '@/components/icons';
import type { PostAuthor } from '@/shared/types/Post';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
  author: PostAuthor;
  created: string | Date;
  id: string | number;
}>();

const emits = defineEmits<{ viewDetails: []; edit: []; report: [] }>();

const menuMore = ref<InstanceType<typeof MenuMore> | undefined>();

function edit() {
  console.log('edit()', menuMore.value);
  menuMore.value?.close();
}

function report() {
  console.log('report()', menuMore.value);
  menuMore.value?.close();
}

function viewProfile() {
  router.push({ path: '/profile', query: { user: props.author.id } });
}
</script>

<template>
  <div class="flex justify-between px-3 lg:px-5 items-start" @click="emits('viewDetails')">
    <div class="flex items-center gap-x-2 z-0" @click.stop="viewProfile">
      <img
        :src="props.author.image || 'https://placehold.co/60x60/162456/fff'"
        class="w-[60px] rounded-full"
      />
      <div class="flex flex-col">
        <span class="font-medium leading-4">{{ props.author.name }}</span>
        <small class="text-[13px] font-light text-gray-800 dark:text-gray-200">{{ props.created }}</small>
      </div>
    </div>
    <!--  -->
    <div class="z-10">
      <MenuMore
        icon-class="!w-[32px]"
        ref="menuMore"
        class="fill-gray-500 hover:fill-gray-800 dark:hover:fill-gray-200"
      >
        <ul class="bg-white dark:bg-black py-1 flex flex-col text-[14px]">
          <li class="py-2 hover:bg-slate-200" @click="edit()" v-if="false">Edit</li>
          <li
            class="py-2 px-1 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center"
            @click="report()"
          >
            <IconFlag class="w-[30px] mr-2" />
            <span>Report</span>
          </li>
        </ul>
      </MenuMore>
    </div>
  </div>
</template>
