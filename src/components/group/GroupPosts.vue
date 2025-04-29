<script lang="ts" setup>
import { useFeedsStore } from '@/stores/feeds';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const feedsStore = useFeedsStore();
const props = defineProps<{ postsId: string[] }>();

const posts = computed(() => feedsStore.list.filter((post) => props.postsId?.includes(post.id)));

function viewPost(id: string): void {
  router.push('/feed/' + id);
}
</script>

<template>
  <div class="bg-light dark:bg-slate-950 relative sm:p-3 md:pb-12">
    <div class="py-1 px-3" v-if="posts.length">
      <h1 class="text-[20px] font-medium sm:px-3">Posts ({{ posts.length }}):</h1>
    </div>

    <ul class="h-[300px] overflow-y-auto flex flex-col gap-2 pt-2 px-3" v-if="posts.length">
      <li
        class="bg-white dark:bg-black cursor-pointer rounded-md max-h-[100px] py-1 sm:py-2 px-3 flex items-center dark:border dark:border-slate-800"
        v-for="(post, i) of posts"
        :key="i"
        @click="viewPost(post.id)"
      >
        <div class="px-2">
          <img :src="post.author.image" class="w-[70px] rounded-full" alt="user-profile" />
        </div>
        <div class="max-h-[65px] w-full py-3 text-ellipsis line-clamp-2">{{ post.content }}</div>
      </li>
    </ul>

    <div class="border border-gray-400 dark:border-slate-700 mt-5 py-[30px] flex justify-center items-center" v-else>
      <p class="text-[20px] font-light">No public posts available. Check back later!</p>
    </div>
  </div>
</template>
