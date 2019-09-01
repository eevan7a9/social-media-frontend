<template>
  <main class="post-container">
    <div class="created-date">
      <small>{{post.created_at}}</small>
    </div>
    <hr />
    <div class="title">
      <h4>{{post.user_username}} -</h4>
      <p>{{post.title}}</p>
    </div>
    <div class="star-comment">
      <div class="star">
        <img src="../assets/icons/star.svg" data="star.svg" alt srcset />
        <span>{{post.likes}}</span>
      </div>
      <div class="comment">
        <img src="../assets/icons/message-square.svg" alt="comment" />
        <span>{{post.comments}}</span>
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
  methods: {},
  computed: mapGetters(["allUsers", "allLikes", "allComments"])
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
  grid-gap: 15px 30px;
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
.star-comment {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
}
.comment {
  padding: 0 30px;
}
img {
  margin-right: 10px;
}
</style>