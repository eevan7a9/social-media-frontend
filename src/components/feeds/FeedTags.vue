<script lang="ts" setup>
const tags = ['Eevan7a9', 'TestTag', 'New_Post', 'Word_Gen'];
</script>

<template>
  <div
    class="text-blue-500 mt-8 text-[16px] md:text-[18px] lg:text-[20px] font-bold flex flex-wrap gap-3 px-3 md:px-5"
  >
    <span v-for="tag of tags" :key="tag"> #{{ tag }} </span>
  </div>
</template>
