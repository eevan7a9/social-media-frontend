<script setup lang="ts">
import MenuMore from '@/components/common/menu/MenuMore.vue';
import { IconFlag } from '@/components/icons';
import type { PostComment } from '@/shared/types/Post';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{ comment: PostComment; showAll?: boolean }>();

const menuMore = ref<InstanceType<typeof MenuMore> | undefined>(undefined);
const createdDate = computed(() => {
  const date = new Date(props.comment?.created || '').toLocaleString();
  return date;
});

function viewProfile() {
  router.push({ path: '/profile', query: { user: props.comment.author?.id } });
}
</script>

<template>
  <div class="bg-white border-t border-gray-200 px-3 py-4 rounded-xl flex items-center gap-x-3">
    <div class="lg:pl-2" @click="viewProfile">
      <img
        :src="comment.author?.image || 'https://placehold.co/100x100/333/FFF'"
        class="w-[50px] h-auto rounded-full"
      />
    </div>

    <div class="w-full">
      <div class="flex items-start">
        <div class="flex items-center gap-x-2 hover:underline" @click="viewProfile">
          <h1 class="text-[15px] font-medium">
            {{ comment.author?.name }}
          </h1>
          <small class="font-light text-gray-600 dark:text-gray-300 text-[12px]">
            {{ createdDate }}
          </small>
        </div>
        <!-- <button
          class="w-[25px] group lg:w-[30px] rounded-full px-1 cursor-pointer hover:bg-gray-200/20"
        >
          <IconHorizontalDots class="fill-gray-500 group-hover:fill-dark dark:group-hover:fill-white" />
        </button> -->
        <MenuMore
          icon-class="!w-[24px]"
          ref="menuMore"
          class="ml-auto py-0 mr-0 fill-gray-500 hover:fill-gray-800 dark:hover:fill-gray-200"
        >
          <ul class="bg-white dark:bg-black py-1 flex flex-col text-[14px]">
            <li
              class="flex items-center p-2 hover:bg-slate-200 dark:hover:bg-slate-600"
              @click="() => menuMore?.close()"
            >
              <IconFlag class="w-[30px] mr-2" />
              <span>Report</span>
            </li>
          </ul>
        </MenuMore>
      </div>

      <p class="text-[14px] font-light" :class="showAll ? 'text-wrap' : 'text-ellipsis line-clamp-1'">
        {{ comment?.content }}
      </p>
    </div>
  </div>
</template>
