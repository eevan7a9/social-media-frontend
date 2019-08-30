<template>
  <main>
    <div class="post-container" v-for="(post, index) in allPosts" :key="index">
      <PostItem :post="post" />
    </div>
  </main>
</template>

<script>
import PostItem from "./PostItem";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PostsList",
  components: {
    PostItem
  },
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