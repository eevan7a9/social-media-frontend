<template>
  <main>
    <transition-group name="fade" tag="div">
      <div class="post-container" v-for="(post) in allPosts" :key="post.id">
        <PostItem :post="post" />
      </div>
    </transition-group>
  </main>
</template>
e
<script>
import PostItem from "./PostItem";
import { mapGetters } from "vuex";
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
  computed: mapGetters(["allPosts"])
};
</script>

<style scoped>
.fade-leave-active {
  /* when post is deleted we see transition effect */
  transition: opacity 1s;
}
</style>