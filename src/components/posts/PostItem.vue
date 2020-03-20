<template>
  <main class="post-container" @click="visitPost">
    <div class="created-date">
      <small>{{ post.created_at }}</small>
    </div>
    <hr class="hr-green" />

    <div class="title" v-if="!update">
      <h4
        class="author-name"
        @click.stop="visitUser(post.user_id)"
        :class="{ owned: post.user_id == currentUser.id }"
      >
        {{ post.user_username }} -
      </h4>
      <p>{{ post.title }}</p>
    </div>
    <div class="title" v-if="update">
      <h4>{{ post.user_username }} -</h4>
      <textarea
        type="text"
        name="title"
        id="edit_title"
        @click.stop
        v-model="post.title"
        @keypress.enter="submit"
      />
    </div>
    <div class="post-bottom">
      <div class="star-comment">
        <!-- Likes starts here -->
        <Like :likes="post.likes" :post_id="post.id" />
        <!-- Likes ends here -->
        <router-link :to="{ name: 'postDetails', params: { id: post.id } }">
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
        <p class="cancel" @click.stop="cancel">Cancel</p>
        <p class="submit" @click.stop="submit">Submit</p>
      </div>
      <div class="post-options" v-if="!update">
        <transition name="bounce">
          <p class="open-options" @click.stop="showOptions" v-if="!options">
            <img
              class="icon-img"
              src="../../assets/icons/more-horizontal.svg"
              alt
              srcset
            />
          </p>
          <ul v-if="options">
            <li @click.stop="edit" v-if="post.user_id == currentUser.id">
              edit
            </li>
            <li @click.stop="remove" v-if="post.user_id == currentUser.id">
              delete
            </li>
            <li @click.stop="reportPost">report</li>
            <li class="close-options" @click.stop="showOptions">...</li>
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
    visitPost() {
      this.$router.push({ name: "postDetails", params: { id: this.post.id } });
    },
    visitUser(id) {
      this.$router.push({ name: "user", params: { id: id } });
    },
    showOptions() {
      this.options = !this.options;
    },
    remove() {
      this.options = !this.options;
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            this.deletePost(this.post.id).then(() => {
              this.$swal.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success"
              );
            });
          }
        });
    },
    edit() {
      this.update = !this.update;
      this.options = 0;
    },
    reportPost() {
      if (this.currentUser.id) {
        this.$swal.fire({
          icon: "success",
          title: "Post Reported!",
          text: "We will take a look!"
          //   footer: "<a href>Why do I have this issue?</a>"
        });
      } else {
        this.$swal.fire({
          icon: "info",
          title: "Not Allowed!",
          text: "Sorry, you need to register & sign-in"
          //   footer: "<a href>Why do I have this issue?</a>"
        });
      }
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
.post-container {
  padding: 30px 25px;
  background: white;
  margin: 20px 0;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: -1px 8px 13px -11px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -1px 8px 13px -11px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 8px 13px -11px rgba(0, 0, 0, 0.75);
}

.post-container:hover {
  box-shadow: -1px 11px 20px -8px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -1px 11px 20px -8px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 11px 20px -8px rgba(0, 0, 0, 0.75);
  transition: 0.5s;
}
.post-container:hover .title {
  background: #e5ebe8;
}
.author-name:hover {
  color: rgb(40, 159, 228);
}
.author-name.owned {
  color: #18d457;
}
#edit_title {
  border: 1px solid #00803e;
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
