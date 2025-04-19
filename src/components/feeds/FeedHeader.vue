<script lang="ts" setup>
import MenuMore from '@/components/common/menu/MenuMore.vue';
import { IconFlag, IconTrash } from '@/components/icons';
import { useAlert, useAlertConfirmation } from '@/composables/alert';
import { AlertType } from '@/shared/enums/Alert';
import { deleteFeed } from '@/shared/services/feedService';
import type { PostAuthor } from '@/shared/types/Post';
import { relativeDateFormat } from '@/shared/utils/date';
import { useAuthStore } from '@/stores/auth';
import { useFeedsStore } from '@/stores/feeds';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const feedsStore = useFeedsStore();
const alert = useAlert();
const alertConfirmation = useAlertConfirmation();

const props = defineProps<{
  author: PostAuthor;
  created: string | Date;
  id: string;
  formatDatesAgo?: boolean;
}>();

const emits = defineEmits<{ viewDetails: []; edit: []; report: [] }>();

const menuMore = ref<InstanceType<typeof MenuMore> | undefined>();

// function edit() {
//   console.log('edit()', menuMore.value);
//   menuMore.value?.close();
// }

function report() {
  console.log('report()', menuMore.value);
  menuMore.value?.close();
  alert.showAlert('Thanks for reporting. The post has been flagged for review. 🛡️', AlertType.Info, 4000);
}

async function remove() {
  const confirmed = await alertConfirmation.value.show(
    'Delete Post',
    'Are you sure you want to delete this Post? This action cannot be undone.',
  );

  if (!confirmed || !props.id) return;
  const id = await deleteFeed(props.id);

  feedsStore.removePost(id);
  if (route.name === 'feedDetailView') {
    router.push('/');
  }
  alert.showAlert('Post deleted successfully. 🗑️', AlertType.Success, 4000);
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
        <small class="text-[13px] mt-1 font-light text-gray-800 dark:text-gray-200">{{
          formatDatesAgo ? relativeDateFormat(props.created) : new Date(props.created).toLocaleString()
        }}</small>
      </div>
    </div>
    <!--  -->
    <div class="z-10">
      <MenuMore
        icon-class="!w-[32px]"
        ref="menuMore"
        class="fill-gray-500 hover:fill-gray-800 dark:hover:fill-gray-100"
      >
        <ul class="bg-white dark:bg-black py-1 flex flex-col text-[14px]">
          <li
            class="py-2 px-1 text-danger hover:bg-slate-200 flex items-center"
            @click="remove()"
            v-if="auth.authUser?.id === props.author.id"
          >
            <IconTrash class="w-[24px] fill-danger" /> Delete
          </li>

          <li
            class="py-2 px-1 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center"
            @click="report()"
            v-if="auth.authUser?.id !== props.author.id"
          >
            <IconFlag class="w-[30px] mr-2" />
            <span>Report</span>
          </li>
        </ul>
      </MenuMore>
    </div>
  </div>
</template>
