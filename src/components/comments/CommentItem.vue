<template>
  <main class="user-comment">
    <div class="comment-message">
      <h3 class="username">{{comment.user_username}}</h3>
      <p class="message">: {{comment.message}}</p>
      <p class="message">: {{comment.user_id}}</p>
    </div>
    <div class="comment-option">
      <ul>
        <li>Edit</li>
        <li>Delete</li>
        <li>Report</li>
      </ul>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CommentItem",
  props: {
    comment: Object
  },
  methods: {
    ...mapActions(["clearPostComments"])
  },
  destroyed() {
    this.clearPostComments();
  }
};
</script>

<style scoped>
.user-comment {
  background: white !important;
  margin-bottom: 20px;
  padding: 20px 10px;
}
.comment-message {
  display: flex;
}
.comment-option ul {
  display: flex;
  justify-content: flex-end;
  list-style: none;
  margin-top: 20px;
}
.comment-option li {
  margin-left: 10px;
}
.message {
  font-size: 18px;
  letter-spacing: 1px;
  margin-left: 20px;
}
</style>