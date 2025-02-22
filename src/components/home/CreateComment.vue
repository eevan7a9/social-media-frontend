<script lang="ts" setup>
import { useAlert } from '@/composables/alert';
import { AlertType } from '@/shared/enums/Alert';
import type { Post } from '@/shared/types/Post';
import { useFeedsStore } from '@/stores/feeds';
import { ref } from 'vue';

const feedStore = useFeedsStore();
const alert = useAlert();
const props = defineProps<{ post: Post }>();
const comment = ref('');

function send(): void {
  if (!comment.value) return;

  feedStore.addComment(props.post.id, { content: comment.value });
  comment.value = '';

  alert.showAlert('Comment posted successfully! 🎉', AlertType.Success);
}
</script>

<template>
  <div class="bg-white px-3 py-2 md:py-3">
    <div class="flex items-center pl-3">
      <input
        v-model="comment"
        placeholder="Write your comment..."
        maxlength="100"
        class="text-[14px] w-full h-[50px] py-2 px-3 pl-5 bg-gray-100 rounded-l-2xl"
      />
      <button
        @click="send()"
        class="bg-primary cursor-pointer hover:bg-sky-700 rounded-r-2xl text-white py-2 px-4 text-[14px] h-[50px]"
      >
        Send
      </button>
    </div>
  </div>
</template>
