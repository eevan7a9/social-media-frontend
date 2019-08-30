<template>
  <main class="post-container">
    <div class="created-date">
      <small>{{post.created_at}}</small>
    </div>
    <hr />
    <div class="title">
      <h4>{{getPostsUsername()}} -</h4>
      <p>{{post.title}}</p>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "postItem",
  props: {
    post: Object
  },
  methods: {
    getPostsUsername() {
      return this.allUsers
        .filter(user => user.id == this.post.user_id)
        .map(user => user.username)[0];
    }
  },
  computed: mapGetters(["allUsers"])
};
</script>

<style scoped>
.post-container {
  padding: 10px 15px;
  background: white;
  margin: 20px 0;
  border-radius: 10px;
}
.title {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  padding: 0 0 20px 0;
}
.created-date {
  width: 100%;
  text-align: right;
}
hr {
  color: #45ad78;
  margin: 5px 0;
}
</style>