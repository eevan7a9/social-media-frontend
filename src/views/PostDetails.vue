<template>
  <main class="container" v-if="isFetched">
    <div class="post-container" id="post-container">
      <div class="back" @click="returnHome">
        <img src="@/assets/icons/x.svg" alt srcset />
      </div>
      <div class="created-date">
        <small>{{ singlePost.created_at }}</small>
      </div>
      <hr class="hr-green" />
      <div class="title" v-if="!update">
        <h4 @click="visitUser(singlePost.user_id)" class="author-name">
          {{ singlePost.user_username }} -
        </h4>
        <p class="post-title">{{ singlePost.title }}</p>
      </div>
      <div class="to-update" v-if="update">
        <h4>{{ singlePost.user_username }} -</h4>
        <textarea
          class="bg-lightdient"
          v-model="singlePost.title"
          id="title"
          cols="30"
          rows="5"
          @keypress.enter="submit"
        ></textarea>
      </div>
      <div class="post-bottom">
        <div class="star-comment">
          <!-- Likes Starts here -->
          <Like :likes="singlePost.likes" :post_id="singlePost.id" />
          <!-- Likes end here -->
          <div>
            <img
              class="icon-img"
              src="@/assets/icons/message-square.svg"
              alt="comment"
            />
            <span>{{ singlePost.comments }}</span>
          </div>
        </div>
        <div class="post-options">
          <ul v-if="!update">
            <li
              @click="edit"
              class="color-green"
              v-if="singlePost.user_id === currentUser.id"
            >
              <img src="@/assets/icons/edit.svg" alt="edit" />
            </li>
            <li
              @click="delPost"
              class="color-red"
              v-if="singlePost.user_id === currentUser.id"
            >
              <img src="@/assets/icons/trash-2.svg" alt="delete" />
            </li>
            <li class="color-muted">
              <img src="@/assets/icons/flag.svg" alt="report" srcset />
            </li>
          </ul>
          <ul class="update-option" v-if="update">
            <li class="cancel" @click="cancel">
              <img src="@/assets/icons/cancel.svg" alt="cancel" />
            </li>
            <li class="submit" @click="submit">
              <img src="@/assets/icons/check.svg" alt="submit" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <CommentsList :post_id="singlePost.id" />
  </main>
</template>

<script>
import Like from "@/components/likes/Like";
import CommentsList from "@/components/comments/CommentsList";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "postDetails",
  components: {
    Like,
    CommentsList
  },
  props: {
    id: Number
  },
  data() {
    return {
      update: 0,
      isFetched: false
    };
  },
  computed: mapGetters(["singlePost", "currentUser"]),
  methods: {
    ...mapActions(["viewPost", "deletePost", "editPost"]),
    cancel() {
      this.update = 0;
    },
    delPost() {
      this.deletePost(this.singlePost.id);
      this.$router.push({ name: "home", query: { redirect: "/" } });
    },
    edit() {
      this.update = !this.update;
    },
    submit() {
      this.editPost(this.singlePost);
      this.update = 0;
    },
    returnHome() {
      this.$router.push({ name: "home", query: { redirect: "/" } });
    },
    visitUser(id) {
      this.$router.push({ name: "user", params: { id: id } });
    }
  },
  created() {
    this.viewPost(this.id).then(() => {
      this.isFetched = true;
    });
  }
};
</script>

<style scoped>
#post-container {
  padding: 30px 25px;
  background: white;
  margin: 30px 0;
  border-radius: 10px;
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
.author-name:hover {
  color: rgb(40, 159, 228);
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
