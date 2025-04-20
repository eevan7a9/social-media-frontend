<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue';
import { IconCog, IconHelp, IconLogout, IconPersonCircle } from '../../icons';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const show = ref(false);
const menuContainer = ref<HTMLElement | undefined>(undefined);

const items = ref([
  {
    label: 'profile',
    path: '/',
    icon: shallowRef(IconPersonCircle),
    disable: false,
    func: () => {
      router.push('/profile');
    },
  },
  {
    label: 'Help',
    path: '/',
    icon: shallowRef(IconHelp),
    disable: true,
  },
  {
    label: 'Settings',
    path: '/',
    icon: shallowRef(IconCog),
    disable: true,
  },
  {
    label: 'Logout',
    path: '/',
    icon: shallowRef(IconLogout),
    disable: true,
  },
]);

function toggle() {
  show.value = !show.value;
}

function detectOutsideClick(e: MouseEvent) {
  if (!menuContainer.value?.contains(e.target as Node)) {
    show.value = false;
  }
}

watch(show, (val) => {
  if (val) {
    setTimeout(() => document.addEventListener('click', detectOutsideClick), 500);
  } else {
    document.removeEventListener('click', detectOutsideClick);
  }
});
</script>

<template>
  <div class="relative group">
    <button @click="toggle()" class="flex items-center gap-x-2 cursor-pointer">
      <!-- <icon-person-circle class="w-[35px] fill-primary group-hover:fill-sky-700 cursor-pointer" /> -->
      <img
        :src="authStore?.authUser?.image || 'https://placehold.co/200x200/060608/FFF'"
        class="h-[42px] rounded-full"
      />
      <span class="text-[16px] font-semibold text-primary dark:text-sky-200">
        {{ authStore?.authUser?.username || 'Guest' }}
      </span>
    </button>

    <div
      ref="menuContainer"
      class="bg-white py-1 pb-2 dark:bg-dark absolute top-[60px] right-0 border border-gray-300 rounded-xl xl:-right-12 w-[300px]"
      v-if="show"
    >
      <ul class="flex flex-col gap-y-2">
        <li
          v-for="item of items"
          :key="item.label"
          :class="item.disable ? 'cursor-not-allowed text-gray-500' : 'cursor-pointer'"
          class="relative capitalize px-3 py-2 flex items-center gap-x-2 md:gap-x-3 hover:bg-slate-100"
          @click="() => item.func && item?.func()"
        >
          <component
            :is="item.icon"
            class="w-[30px]"
            :class="item.disable ? 'fill-gray-400' : 'fill-primary'"
          />
          <p class="text-ellipsis line-clamp-1 text-[16px]">{{ item.label }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
