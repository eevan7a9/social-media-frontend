<template>
  <main class="post-container">
    <div class="created-date">
      <small>{{post.created_at}}</small>
    </div>
    <hr />
    <div class="title">
      <h4>{{getPostsUsername()}} -</h4>
      <p>{{post.title}}</p>
      <div class="like-comment">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-heart"
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          />
        </svg>
        <span>{{getPostsLikes()}}</span>
      </div>
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
    },
    getPostsLikes() {
      return this.allLikes.filter(like => like.post_id == this.post.id).length;
    }
  },
  computed: mapGetters(["allUsers", "allLikes"])
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
.like-comment {
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
}
svg {
  fill: rgb(48, 105, 51);
}
</style>