<script lang="ts" setup>
defineProps<{ filled?: boolean }>();
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" v-if="filled">
    <title>bookmark-check</title>
    <path
      d="M17,3A2,2 0 0,1 19,5V21L12,18L5,21V5C5,3.89 5.9,3 7,3H17M11,14L17.25,7.76L15.84,6.34L11,11.18L8.41,8.59L7,10L11,14Z"
    />
  </svg>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" v-else>
    <title>bookmark-outline</title>
    <path d="M17,18L12,15.82L7,18V5H17M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z" />
  </svg>
</template>
