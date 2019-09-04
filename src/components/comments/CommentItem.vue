<template>
  <main class="user-comment">
    <div class="comment-message">
      <h3 class="username">{{comment.user_username}}</h3>
      <p class="message">: {{comment.message}}</p>
    </div>
    <hr />
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
hr {
  color: #45ad78;
  margin-top: 20px;
}
.user-comment {
  background: white !important;
  margin-bottom: 20px;
  padding: 20px 10px;
  border-radius: 10px;
  box-shadow: 6px 7px #bbb7b7;
}
.comment-message {
  display: flex;
}
.comment-option ul {
  display: flex;
  justify-content: flex-end;
  list-style: none;
  margin-top: 5px;
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