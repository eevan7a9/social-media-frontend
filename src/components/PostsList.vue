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
    ...mapActions(["getPosts", "getLikes", "getUsers", "getComments"])
  },
  computed: mapGetters(["allPosts"]),
  created() {
    this.getUsers().then(() => {
      this.getComments().then(() => {
        this.getLikes().then(() => {
          if (this.allPosts.length === 0) {
            this.getPosts();
          }
        });
      });
    });
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>