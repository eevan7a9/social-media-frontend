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
    <div class="post-bottom">
      <div class="star-comment">
        <img src="../assets/icons/star.svg" data="star.svg" alt srcset />
        <span class="star">{{post.likes}}</span>
        <img src="../assets/icons/message-square.svg" alt="comment" />
        <span>{{post.comments}}</span>
      </div>
      <div class="post-options">
        <transition name="bounce">
          <p class="open-options" v-if="!options">
            <img @click="showOptions" src="../assets/icons/more-horizontal.svg" alt srcset />
          </p>
          <ul v-if="options">
            <li>edit</li>
            <li @click="delPost">delete</li>
            <li>report</li>
            <li class="close-options" @click="showOptions">...</li>
          </ul>
        </transition>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "postItem",
  props: {
    post: Object
  },
  data() {
    return {
      options: 0
    };
  },
  methods: {
    ...mapActions(["deletePost"]),
    showOptions() {
      this.options = !this.options;
    },
    delPost() {
      this.deletePost(this.post.id);
      this.showOptions();
    }
  },
  computed: mapGetters(["allUsers", "allLikes", "allComments"])
};
</script>

<style scoped>
hr {
  color: #45ad78;
  margin: 5px 0;
}
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
.post-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
img {
  margin-right: 10px;
}
.comment {
  padding: 0 30px;
}
.star {
  margin-right: 30px;
}
.post-options {
  display: flex;
}
.post-options ul {
  background: #45ad78;
  position: initial;
  margin-top: -98px;
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