<script setup lang="ts">
import LeftSide from '@/components/Home/LeftSide.vue';
import RightSide from '@/components/Home/RightSide.vue';

</script>

<template>
  <div class="grid grid-cols-12 w-full max-w-screen-lg mx-auto relative">
    <LeftSide class="col-span-3 pt-3 lg:pt-4" />

    <section class="col-span-6 h-full pt-4 px-3">
      <div class="h-[3000px] w-2">Feeds</div>
    </section>

    <RightSide class="col-span-3 relative pt-3 lg:pt-4" />
  </div>
</template>

<style lang="scss" scoped></style>