<script lang="ts" setup>
import { useAlert } from '@/composables/alert';
import { AlertType } from '@/shared/enums/Alert';
import { createFeedComment } from '@/shared/services/feedService';
import type { Post, PostComment } from '@/shared/types/Post';
import { useAuthStore } from '@/stores/auth';
import { useFeedsStore } from '@/stores/feeds';
import { ref } from 'vue';

const feedStore = useFeedsStore();
const authStore = useAuthStore();

const alert = useAlert();
const props = defineProps<{ post: Post }>();
const comment = ref('');

async function send(): Promise<void> {
  if (!comment.value || !authStore.authUser?.token) return;
  const res = await createFeedComment(props.post.id, { content: comment.value }, authStore.authUser?.token);
  feedStore.addComment(props.post.id, res as PostComment);
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
