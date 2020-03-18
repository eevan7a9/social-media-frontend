<template>
  <main>
    <div class="created-date">
      <small>{{ post.created_at }}</small>
    </div>
    <hr class="hr-green" />
    <router-link
      :to="{ name: 'postdetails', params: { id: post.id } }"
      v-if="!update"
    >
      <div class="title">
        <h4
          :style="
            post.user_id == currentUser.id
              ? 'color:rgb(25, 147, 85);'
              : 'color:#333;'
          "
        >
          {{ post.user_username }} -
        </h4>
        <p>{{ post.title }}</p>
      </div>
    </router-link>
    <div class="title" v-if="update">
      <h4>{{ post.user_username }} -</h4>
      <textarea
        type="text"
        name="title"
        id="edit_title"
        v-model="post.title"
        @keypress.enter="submit"
      />
    </div>
    <div class="post-bottom">
      <div class="star-comment">
        <!-- Likes starts here -->
        <Like :likes="post.likes" :post_id="post.id" />
        <!-- Likes ends here -->
        <router-link :to="{ name: 'postdetails', params: { id: post.id } }">
          <div>
            <img
              class="icon-img"
              src="../../assets/icons/message-square.svg"
              alt="comment"
            />
            <span>{{ post.comments }}</span>
          </div>
        </router-link>
      </div>
      <div class="update-option" v-if="update">
        <p class="cancel" @click="cancel">Cancel</p>
        <p class="submit" @click="submit">Submit</p>
      </div>
      <div class="post-options" v-if="!update">
        <transition name="bounce">
          <p class="open-options" v-if="!options">
            <img
              class="icon-img"
              @click="showOptions"
              src="../../assets/icons/more-horizontal.svg"
              alt
              srcset
            />
          </p>
          <ul v-if="options">
            <li @click="edit" v-if="post.user_id == currentUser.id">edit</li>
            <li @click="remove" v-if="post.user_id == currentUser.id">
              delete
            </li>
            <li>report</li>
            <li class="close-options" @click="showOptions">...</li>
          </ul>
        </transition>
      </div>
    </div>
  </main>
</template>

<script>
import Like from "../likes/Like";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "postItem",
  components: {
    Like
  },
  props: {
    post: Object
  },
  data() {
    return {
      options: 0,
      update: 0
    };
  },
  computed: mapGetters(["currentUser"]),
  methods: {
    ...mapActions(["deletePost", "editPost"]),
    showOptions() {
      this.options = !this.options;
    },
    remove() {
      this.showOptions();
      this.deletePost(this.post.id);
    },
    edit() {
      this.update = !this.update;
      this.options = 0;
    },
    submit() {
      this.update = 0;
      this.editPost(this.post);
    },
    cancel() {
      this.update = 0;
    }
  }
};
</script>

<style scoped>
#edit_title {
  border: 1px solid #4c926e;
  padding: 5px;
  border-radius: 5px;
}
a {
  text-decoration: none;
  color: #333;
}
.star-comment {
  display: flex;
}
.title:hover {
  background: #e5ebe8;
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

.post-options {
  display: flex;
  position: relative;
  display: inline-block;
}
.post-options ul {
  background: #45ad78;
  position: relative;
  margin-top: -40px;
  list-style: none;
  border-radius: 10px;
  border: #fff 1px solid;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.post-options li {
  padding: 5px 30px 5px 30px;
  text-align: center;
  color: white;
  text-transform: capitalize;
  cursor: pointer;
}
.post-options li:hover {
  background: #4c926e;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.open-options {
  color: #45ad78;
  cursor: pointer;
  border-radius: 10px;
}
.open-options:hover {
  background: rgb(241, 240, 240);
}
.close-options {
  font-weight: 900;
  padding: 0;
  font-size: 20px;
}
</style>
