<script setup lang="ts">
import MenuMore from '@/components/common/menu/MenuMore.vue';
import { IconFlag, IconTrash } from '@/components/icons';
import { useAlert, useAlertConfirmation } from '@/composables/alert';
import { AlertType } from '@/shared/enums/Alert';
import type { PostComment } from '@/shared/types/Post';
import { useAuthStore } from '@/stores/auth';
import { useFeedsStore } from '@/stores/feeds';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const alert = useAlert();
const alertConfirmation = useAlertConfirmation();
const router = useRouter();
const authStore = useAuthStore();
const feedsStore = useFeedsStore();

const props = defineProps<{ postId: string; comment: PostComment; showAll?: boolean }>();

const menuMore = ref<InstanceType<typeof MenuMore> | undefined>(undefined);
const createdDate = computed(() => {
  const date = new Date(props.comment?.created || '').toLocaleString();
  return date;
});

function report() {
  menuMore.value?.close();
  alert.showAlert('Comment reported successfully. Our team will review it soon.', AlertType.Info, 4000);
}

async function remove() {
  const confirm = await alertConfirmation.value.show(
    'Delete Comment',
    'Are you sure you want to delete this Comment? This action cannot be undone.',
  );
  if (!confirm) return;

  feedsStore.removeComment(props.postId, props.comment.id);
  alert.showAlert('Comment deleted successfully. 🗑️', AlertType.Success, 4000);
}

function viewProfile() {
  router.push({ path: '/profile', query: { user: props.comment.author?.id } });
}
</script>

<template>
  <div class="bg-white dark:bg-dark border-t border-gray-200 dark:border-slate-700 px-3 py-4 rounded-xl flex items-center gap-x-3">
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

        <MenuMore
          icon-class="!w-[24px]"
          ref="menuMore"
          class="ml-auto py-0 mr-0 fill-gray-500 hover:fill-gray-800 dark:hover:fill-gray-200"
        >
          <ul class="bg-white dark:bg-black py-1 flex flex-col text-[14px]">
            <li
              class="flex items-center p-2 hover:bg-slate-200 dark:hover:bg-slate-600"
              @click="report()"
              v-if="authStore.authUser?.id !== props.comment.author?.id"
            >
              <IconFlag class="w-[30px] mr-2" />
              <span>Report</span>
            </li>

            <li
              class="flex items-center p-2 hover:bg-slate-200 dark:hover:bg-slate-600"
              @click="remove()"
              v-if="authStore.authUser?.id === props.comment.author?.id"
            >
              <IconTrash class="w-[30px] mr-2" />
              <span>Delete</span>
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
