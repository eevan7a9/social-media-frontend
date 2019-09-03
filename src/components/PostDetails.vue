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
          <img class="icon-img" src="../assets/icons/star.svg" data="star.svg" alt srcset />
          <span class="star">{{postDetails.likes}}</span>
          <img class="icon-img" src="../assets/icons/message-square.svg" alt="comment" />
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

    delPost() {
      this.deletePost(this.postDetails.id);
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
  color: #333;
  text-transform: capitalize;
  font-style: italic;
  cursor: pointer;
}
</style>