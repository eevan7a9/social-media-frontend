<template>
  <div>
    <h4>Recommended Posts</h4>
    <ul class="recent-posts">
      <li
        class="recent-items"
        v-for="(post, index) in recommendedPosts"
        :key="index"
      >
        <router-link :to="{ name: 'postDetails', params: { id: post.id } }">
          <p>{{ post.title }}</p>
          <small>
            <i>- {{ post.user_username }}</i>
          </small>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "RecommendPosts",
  data() {
    return {
      posts: []
    };
  },
  computed: mapGetters(["recommendedPosts"])
};
</script>

<style scoped>
h4 {
  margin-bottom: 15px;
}
ul {
  list-style: none;
}
.recent-items {
  padding: 10px 10px;
  cursor: pointer;
  border: 1px solid #45ad78;
  border-radius: 5px;
  margin-bottom: 5px;
  font-size: 15px;
}
.recent-items:hover {
  background: #b5e9ce;
  transition: 0.5s;
}
a {
  text-decoration: none;
  color: #333;
}
</style>
