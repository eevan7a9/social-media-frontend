<script lang="ts" setup>
import type { Post } from '@/shared/types/Post';
import { IconShare, IconThumbUp, IconBookmarkDefault, IconChat } from '@/components/icons';
import { useAlert } from '@/composables/alert';
import { AlertType } from '@/shared/enums/Alert';
import { useFeedsStore } from '@/stores/feeds';

const feedStore = useFeedsStore();
const props = defineProps<{ post: Post }>();
const emits = defineEmits<{ toggleComment: [] }>();
const alert = useAlert();

function liked() {
  feedStore.likeFeed(props.post.id);
  if (props.post.hasLiked) {
    alert.showAlert('Thanks for the like! 😊', AlertType.Liked);
  }
}

function shared() {
  feedStore.shareFeed(props.post.id);
  if (props.post.hasShared) {
    alert.showAlert('You’ve shared this post! 📤', AlertType.Shared);
  }
}

function saved() {
  feedStore.saveFeed(props.post.id);
  if (props.post.hasSaved) {
    alert.showAlert('Added to your favorites! ⭐', AlertType.Saved);
  }
}
</script>

<template>
  <div class="px-3 py-3 lg:px-5 lg:pl-6 border-t border-gray-200 mt-3 lg:mt-5 flex gap-x-1 lg:gap-x-3">
    <button
      @click.stop="liked()"
      class="p-1 flex items-center gap-x-2 group cursor-pointer hover:text-sky-500"
      :class="props.post.hasLiked ? 'text-sky-600' : 'text-gray-500'"
    >
      <span class="text-[16px] font-normal">
        {{ props.post.actions.like || 0 }}
      </span>
      <IconThumbUp
        :filled="props.post.hasLiked"
        class="w-[32px] group-hover:fill-sky-500 p-1 rounded-full group-hover:scale-150 transition-all duration-300 ease-in-out"
        :class="
          props.post.hasLiked
            ? 'fill-sky-600 bg-sky-400/20'
            : 'bg-gray-700/10 fill-gray-800 dark:fill-gray-200'
        "
      />
    </button>

    <button
      @click.stop="shared()"
      class="p-1 flex items-center gap-x-1 group cursor-pointer hover:text-yellow-500"
      :class="props.post.hasShared ? 'text-warning' : 'text-gray-500'"
    >
      <span class="text-[16px] font-normal">
        {{ props.post.actions.share || 0 }}
      </span>
      <IconShare
        class="w-[34px] group-hover:fill-yellow-500 group-hover:bg-warning/20 p-1 rounded-full group-hover:scale-150 transition-all duration-300 ease-in-out"
        :class="
          props.post.hasShared
            ? 'fill-warning bg-warning/20'
            : 'fill-gray-700 bg-gray-700/10 dark:fill-gray-300'
        "
      />
    </button>

    <button @click.stop="saved()" class="p-1 flex items-center group cursor-pointer">
      <IconBookmarkDefault
        class="w-[30px] lg:w-[35px] group-hover:fill-accent group-hover:scale-150 transition-all duration-300 ease-in-out"
        :filled="props.post.hasSaved"
        :class="props.post.hasSaved ? 'fill-accent' : 'fill-gray-700 dark:fill-gray-300'"
      />
      <span
        class="text-[13px] font-light"
        :class="props.post.hasSaved ? 'text-accent' : 'text-dark dark:text-white'"
      >
        {{ props.post.hasSaved ? 'Saved' : 'Save' }}
      </span>
    </button>

    <button
      @click.stop
      @click="emits('toggleComment')"
      class="group p-1 cursor-pointer flex items-center gap-x-2 self-end ml-auto mr-0"
    >
      <span class="text-[16px] font-normal text-gray-700 dark:text-gray-200">
        {{ props.post.comments?.length || 0 }}
      </span>
      <IconChat
        class="w-[30px] fill-gray-700 dark:fill-gray-300 group-hover:fill-sky-700 group-hover:scale-150 transition-all duration-300 ease-in-out"
      />
    </button>
  </div>
</template>
