<script lang="ts" setup>
const props = defineProps<{ image: string }>();
</script>

<template>
  <section class="relative h-[300px] overflow-hidden bg-gray-800">
    <!-- Blurred background version of the image -->
    <div
      class="absolute inset-0 z-0 bg-center bg-cover blur-xs scale-105 opacity-70"
      :style="{
        backgroundImage: `url(${props.image || 'https://placehold.co/1200x300'})`,
      }"
    ></div>

    <!-- Crisp image/content on top -->
    <img
      :src="props.image || 'https://placehold.co/1200x300'"
      alt="cover-photo"
      class="relative z-10 h-full w-full max-w-screen-lg mx-auto object-cover"
    />
  </section>
</template>
