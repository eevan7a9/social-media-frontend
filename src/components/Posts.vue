<template>
  <main>
    <div class="post-cont">
      <h1>{{allPosts}}</h1>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Posts",
  data() {
    return {
      name: "evan"
    };
  },
  methods: {
    ...mapActions(["getPosts"])
  },
  computed: mapGetters(["allPosts"]),
  created() {
    this.getPosts();
  }
};
</script>

<style>
</style>