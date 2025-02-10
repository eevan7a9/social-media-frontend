<script lang="ts" setup>
import type { Post } from '@/shared/types/Post';
import { IconShare, IconThumbUp, IconBookmarkDefault, IconChat, IconFlag } from '@/components/icons';
import FeedComment from './FeedComment.vue';
import { PostTypes } from '@/shared/enums/Post';
import CreateComment from '../CreateComment.vue';
import { onMounted, ref } from 'vue';
import MenuMore from '@/components/common/menu/MenuMore.vue';

const props = defineProps<{ post: Post; onInitShowCreate?: boolean }>();

const showCreateComment = ref(false);
const menuMore = ref<InstanceType<typeof MenuMore> | undefined>();

function edit() {
  console.log('edit()', menuMore.value);
  menuMore.value?.close();
}
function report() {
  console.log('report()', menuMore.value);
  menuMore.value?.close();
}

onMounted(() => {
  if (props.onInitShowCreate) {
    showCreateComment.value = true;
  }
});
</script>

<template>
  <div>
    <article
      class="bg-white dark:bg-dark pt-3 lg:pt-4 rounded-t-xl"
      :class="{
        'rounded-b-xl': !post.comments.length && !showCreateComment,
        'border-b-0': post.comments.length || showCreateComment,
      }"
    >
      <div class="flex justify-between px-3 lg:px-5 items-start">
        <div class="flex items-center gap-x-2 z-0">
          <img src="https://placehold.co/60x60/162456/fff" class="rounded-full" />
          <div class="flex flex-col">
            <span class="font-medium leading-4">{{ post.author.name }}</span>
            <small class="text-[13px] font-light text-gray-800 dark:text-gray-200">{{ post.created }}</small>
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

      <!-- Contents -->

      <div class="mt-3 px-3 lg:px-5" v-if="post.type === PostTypes.Text">
        <h1 class="text-[16px] font-light pl-2">{{ post.title }}</h1>
      </div>

      <div class="mt-3 px-3 lg:px-5" v-if="post.type === PostTypes.Image">
        <h1 class="text-[16px] font-light pl-2">{{ post.title }}</h1>
        <!-- <div>{{ post.content }}</div> -->
        <div class="h-full max-h-[350px] w-full relative overflow-hidden flex justify-center mt-3">
          <img src="https://placehold.co/800x800" class="h-auto w-full object-cover rounded-xl" />
        </div>
      </div>

      <!-- Actions -->
      <div class="px-3 py-3 lg:px-5 lg:pl-6 border-t border-gray-200 mt-3 lg:mt-5 flex gap-x-1 lg:gap-x-3">
        <button
          class="p-1 flex items-center gap-x-2 group cursor-pointer hover:text-sky-500"
          :class="post.hasLiked ? 'text-sky-600' : 'text-gray-500'"
        >
          <span class="text-[16px] font-normal">
            {{ post.actions.like || 0 }}
          </span>
          <IconThumbUp
            :filled="post.hasLiked"
            class="w-[32px] group-hover:fill-sky-500 scale-x-[-1] p-1 rounded-full"
            :class="
              post.hasLiked ? 'fill-sky-600 bg-sky-400/20' : 'bg-gray-700/10 fill-gray-800 dark:fill-gray-200'
            "
          />
          <!-- <IconThumbUpOutline
          class="w-[25px] group-hover:fill-sky-500 scale-x-[-1] fill-gray-700 dark:fill-gray-300"
          v-else
        /> -->
        </button>

        <button
          class="p-1 flex items-center gap-x-1 group cursor-pointer hover:text-yellow-500"
          :class="post.hasShared ? 'text-warning' : 'text-gray-500'"
        >
          <span class="text-[16px] font-normal">
            {{ post.actions.share || 0 }}
          </span>
          <IconShare
            class="w-[34px] group-hover:fill-yellow-500 group-hover:bg-warning/20 p-1 rounded-full"
            :class="
              post.hasShared
                ? 'fill-warning bg-warning/20'
                : 'fill-gray-700 bg-gray-700/10 dark:fill-gray-300'
            "
          />
        </button>

        <button class="p-1 flex items-center group cursor-pointer">
          <IconBookmarkDefault
            class="w-[30px] group-hover:fill-accent"
            :filled="post.hasSaved"
            :class="post.hasSaved ? 'fill-accent' : 'fill-gray-700 dark:fill-gray-300'"
          />
          <span
            class="text-[13px] font-light"
            :class="post.hasSaved ? 'text-accent' : 'text-dark dark:text-white'"
          >
            {{ post.hasSaved ? 'Saved' : 'Save' }}
          </span>
        </button>

        <button
          @click="showCreateComment = !showCreateComment"
          class="group p-1 cursor-pointer flex items-center gap-x-2 self-end ml-auto mr-0"
        >
          <span class="text-[16px] font-normal text-gray-700 dark:text-gray-200">
            {{ post.comments?.length || 0 }}
          </span>
          <IconChat class="w-[30px] fill-gray-700 dark:fill-gray-300 group-hover:fill-sky-700" />
        </button>
      </div>
    </article>

    <div v-if="showCreateComment">
      <CreateComment
        class="border-t border-gray-200"
        :class="{ 'border-b-0': post.comments.length, 'rounded-b-xl !pb-4': !post.comments.length }"
      />
    </div>

    <div class="" v-if="post.comments[0]">
      <FeedComment class="rounded-t-none" :comment="post.comments[0]" />
    </div>
  </div>
</template>
