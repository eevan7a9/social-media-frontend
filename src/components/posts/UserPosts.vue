<template>
  <div class="recent-posts-container">
    <div class="inner-posts-container">
      <h1>Recent Posts:</h1>
      <div class="recent-posts">
        <div v-for="post in ownedPosts" :key="post.id">
          <PostItem :post="post" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostItem from "./PostItem";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    PostItem
  },
  props: {
    userId: Number
  },
  data() {
    return {
      posts: []
    };
  },
  computed: {
    ...mapGetters(["ownedPosts"])
  },
  methods: {
    ...mapActions(["getMyPosts"])
  },
  created() {
    this.getMyPosts(this.userId);
  }
};
</script>

<style scoped>
.recent-posts-container {
  width: 80%;
  padding: 30px 25px;
  /* background: #fff; */
  margin: 20px 0;
  border-radius: 10px;
  cursor: pointer;
}
.inner-posts-container {
  border-top: 3px solid #4c926e;

  padding: 15px;
  color: #333;
}
.inner-posts-container > h1 {
  margin-bottom: 10px;
}
@media (max-width: 700px) {
  .recent-posts-container {
    width: 100%;
  }
}
</style>
