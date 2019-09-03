<template>
  <main class="container">
    <div class="post-container">
      <div class="created-date">
        <small>{{postDetails.created_at}}</small>
      </div>
      <hr />
      <div class="title">
        <h4>{{postDetails.user_username}} -</h4>
        <p>{{postDetails.title}}</p>
      </div>
      <div class="post-bottom">
        <div class="star-comment">
          <img src="../assets/icons/star.svg" data="star.svg" alt srcset />
          <span class="star">{{postDetails.likes}}</span>
          <img src="../assets/icons/message-square.svg" alt="comment" />
          <span>{{postDetails.comments}}</span>
        </div>
        <div class="post-options">
          <ul>
            <li>edit</li>
            <li @click="delPost">delete</li>
            <li>report</li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PostDetails",
  props: {
    id: Number
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["postDetails"])
  },
  methods: {
    ...mapActions(["viewPost", "deletePost"]),
    showOptions() {
      this.options = !this.options;
    },
    delPost() {
      this.deletePost(this.postDetails.id);
      this.showOptions();
    }
  },
  created() {
    this.viewPost(this.id);
  }
};
</script>

<style>
.post-container {
  padding: 10px 15px;
  background: white;
  margin: 20px 0;
  border-radius: 10px;
}
hr {
  color: #45ad78;
  margin: 5px 0;
}
.title {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 15px 30px;
  padding: 5px 5px 20px 5px;
  cursor: pointer;
  color: #333;
  text-decoration: none;
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
img {
  margin-right: 10px;
}
.comment {
  padding: 0 30px;
}
.star {
  margin-right: 30px;
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
  color: #333;
  text-transform: capitalize;
  font-style: italic;
  cursor: pointer;
}
</style>