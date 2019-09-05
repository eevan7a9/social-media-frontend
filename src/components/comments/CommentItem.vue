<template>
  <main class="user-comment">
    <div class="comment-message">
      <h3 class="username">{{comment.user_username}}</h3>
      <p class="message">: {{comment.message}}</p>
    </div>
    <hr />
    <div class="comment-option">
      <ul>
        <li>
          <img src="../../assets/icons/edit.svg" alt="edit" />
        </li>
        <li @click="remove">
          <img src="../../assets/icons/trash-2.svg" alt="delete" />
        </li>
        <li>
          <img src="../../assets/icons/flag.svg" alt="report" />
        </li>
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
    ...mapActions([
      "clearPostComments",
      "deleteComment",
      "getPostComments",
      "removePostComment"
    ]),
    remove() {
      this.deleteComment(this.comment.id).then(() =>
        this.getPostComments(this.comment.post_id).then(() =>
          this.removePostComment()
        )
      );
    }
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
  cursor: pointer;
  padding: 7px;
}
.comment-option li:hover {
  background: #c5c9c7;
  border-radius: 2px;
}
.message {
  font-size: 18px;
  letter-spacing: 1px;
  margin-left: 20px;
}
</style>