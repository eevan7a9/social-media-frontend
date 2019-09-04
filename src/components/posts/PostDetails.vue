<template>
  <main class="container">
    <div class="post-container">
      <div class="back" @click="returnHome">
        <img src="../../assets/icons/x.svg" alt srcset />
      </div>
      <div class="created-date">
        <small>{{postDetails.created_at}}</small>
      </div>
      <hr />
      <div class="title" v-if="!update">
        <h4>{{postDetails.user_username}} -</h4>
        <p>{{postDetails.title}}</p>
      </div>
      <div class="to-update" v-if="update">
        <h4>{{postDetails.user_username}} -</h4>
        <textarea
          v-model="postDetails.title"
          id="title"
          cols="30"
          rows="5"
          @keypress.enter="submit"
        ></textarea>
      </div>
      <div class="post-bottom">
        <div class="star-comment">
          <img class="icon-img" src="../../assets/icons/star.svg" data="star.svg" alt srcset />
          <span class="star">{{postDetails.likes}}</span>
          <img class="icon-img" src="../../assets/icons/message-square.svg" alt="comment" />
          <span>{{postDetails.comments}}</span>
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
            <li class="cancel" @click="cancel">Cancel</li>
            <li class="submit" @click="submit">Submit</li>
          </ul>
        </div>
      </div>
    </div>
    <CommentsList />
  </main>
</template>

<script>
import CommentsList from "../comments/CommentsList";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PostDetails",
  components: {
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
hr {
  color: #45ad78;
  margin: 5px 0;
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
  padding: 5px 30px 5px 30px;
  text-align: center;
  text-transform: capitalize;
  font-style: italic;
  cursor: pointer;
}
</style>