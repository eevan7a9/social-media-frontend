<script lang="ts" setup>
import type { TopStory } from '@/shared/types/Stories';

defineProps<{ story: TopStory }>();
</script>

<template>
  <li class="h-[200px] w-full bg-sky-950 rounded-md"></li>
</template>
