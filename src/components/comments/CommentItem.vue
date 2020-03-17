<template>
  <main class="user-comment">
    <div class="comment-message" v-if="!update">
      <h3 class="username">{{comment.user_username}}</h3>
      <p class="message">: {{comment.message}}</p>
    </div>
    <div class="comment-message" v-if="update">
      <h3 class="username">{{comment.user_username}}</h3>
      <textarea type="text" id="message" class="bg-lightdient" v-model="message"></textarea>
    </div>
    <hr />
    <div class="comment-option">
      <ul v-if="update">
        <li @click="edit">
          <img src="../../assets/icons/cancel.svg" alt="cancel" />
        </li>
        <li @click="submit">
          <img src="../../assets/icons/check.svg" alt="submit" />
        </li>
      </ul>
      <ul v-if="!update">
        <li @click="edit" v-if="comment.user_id === currentUser.id">
          <img src="../../assets/icons/edit.svg" alt="edit" />
        </li>
        <li @click="remove" v-if="comment.user_id === currentUser.id">
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CommentItem",
  props: {
    comment: Object
  },
  data() {
    return {
      update: 0,
      message: this.comment.message
    };
  },
  computed: mapGetters(["currentUser"]),
  methods: {
    ...mapActions(["deleteComment", "subtractPostComment", "updateComment"]),
    remove() {
      this.deleteComment(this.comment.id).then(() =>
        this.subtractPostComment()
      );
    },
    edit() {
      this.update = !this.update;
    },
    submit() {
      this.update = 0;
      this.updateComment({
        id: this.comment.id,
        message: this.message
      }).then(() => {
        this.$swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your comment has been updated",
          showConfirmButton: false,
          timer: 2000
        });
      });
    }
  }
};
</script>

<style scoped>
hr {
  color: #45ad78;
  margin-top: 20px;
}
form {
  width: 100%;
}
button {
  color: white;
  font-weight: 900;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px white solid;
  padding: 10px;
}
textarea {
  width: 100%;
  margin-left: 30px;
}
#message {
  width: 100%;
  font-size: 18px;
  border: 2px solid #45ad78;
  border-radius: 10px;
  padding: 5px 10px;
  margin-top: 10px;
}
.input-submit {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 30px;
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