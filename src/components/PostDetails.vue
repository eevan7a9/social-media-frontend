<template>
  <main>{{id}}</main>
</template>

<script>
export default {
  name: "PostDetails",
  props: {
    id: Number
  },
  created() {
    console.log(this.id);
  }
};
</script>

<style>
</style>