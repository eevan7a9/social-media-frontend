<template>
  <main class="container">
    <div class="post-container" id="post-container">
      <div class="back" @click="returnHome">
        <img src="../../assets/icons/x.svg" alt srcset />
      </div>
      <div class="created-date">
        <small>{{postDetails.created_at}}</small>
      </div>
      <hr class="hr-green" />
      <div class="title" v-if="!update">
        <h4>{{postDetails.user_username}} -</h4>
        <p class="post-title">{{postDetails.title}}</p>
      </div>
      <div class="to-update" v-if="update">
        <h4>{{postDetails.user_username}} -</h4>
        <textarea
          class="bg-lightdient"
          v-model="postDetails.title"
          id="title"
          cols="30"
          rows="5"
          @keypress.enter="submit"
        ></textarea>
      </div>
      <div class="post-bottom">
        <div class="star-comment">
          <!-- Likes Starts here -->
          <Like :likes="postDetails.likes" :post_id="postDetails.id" />
          <!-- Likes end here -->
          <div>
            <img class="icon-img" src="../../assets/icons/message-square.svg" alt="comment" />
            <span>{{postDetails.comments}}</span>
          </div>
        </div>
        <div class="post-options">
          <ul v-if="!update">
            <li @click="edit" class="color-green">
              <img src="../../assets/icons/edit.svg" alt="edit" />
            </li>
            <li @click="delPost" class="color-red">
              <img src="../../assets/icons/trash-2.svg" alt="delete" />
            </li>
            <li class="color-muted">
              <img src="../../assets/icons/flag.svg" alt="report" srcset />
            </li>
          </ul>
          <ul class="update-option" v-if="update">
            <li class="cancel" @click="cancel">
              <img src="../../assets/icons/cancel.svg" alt srcset />
            </li>
            <li class="submit" @click="submit">
              <img src="../../assets/icons/check.svg" alt srcset />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <CommentsList :post_id="postDetails.id" />
  </main>
</template>

<script>
import Like from "../likes/Like";
import CommentsList from "../comments/CommentsList";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PostDetails",
  components: {
    Like,
    CommentsList
  },
  props: {
    id: Number
  },
  data() {
    return {
      update: 0
    };
  },
  computed: {
    ...mapGetters(["postDetails"])
  },
  methods: {
    ...mapActions(["viewPost", "deletePost", "editPost"]),
    cancel() {
      this.update = 0;
    },
    delPost() {
      this.deletePost(this.postDetails.id);
      this.$router.push({ name: "home", query: { redirect: "/" } });
    },
    edit() {
      this.update = !this.update;
    },
    submit() {
      this.editPost(this.postDetails);
      this.update = 0;
    },
    returnHome() {
      this.$router.push({ name: "home", query: { redirect: "/" } });
    }
  },
  created() {
    this.viewPost(this.id);
  }
};
</script>

<style scoped>
#post-container {
  margin-bottom: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.star-comment {
  display: flex;
}
.back {
  padding-left: 20px;
  padding-top: 10px;
  cursor: pointer;
}
.created-date {
  width: 100%;
  text-align: right;
}
.post-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.post-options ul {
  position: initial;
  list-style: none;
  border-radius: 10px;
  border: #fff 1px solid;
  display: flex;
  justify-content: flex-end;
}
.post-options li {
  padding: 7px;
  text-align: center;
  text-transform: capitalize;
  font-style: italic;
  cursor: pointer;
  margin-left: 30px;
}
.post-options li:hover {
  background: #c5c9c7;
  border-radius: 4px;
}
.post-title {
  font-size: 18px;
  letter-spacing: 1.5px;
}
</style>