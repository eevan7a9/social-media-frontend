<script lang="ts" setup>
import type { Story } from '@/shared/types/Stories';

defineProps<{ story: Story }>();
</script>

<template>
  <li class="h-[200px] w-full bg-sky-950 rounded-md"></li>
</template>
