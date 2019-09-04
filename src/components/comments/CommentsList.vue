<template>
  <main class="comments-container">
    <div class="user-comment" v-for="comment in postComments" :key="comment.id">
      <p class="message">{{comment.message}}</p>
      <h2>sdsd</h2>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CommentsList",
  props: {
    post_id: Number
  },
  computed: mapGetters(["postComments"]),
  methods: {
    ...mapActions(["getPostComments"])
  },
  created() {
    this.getPostComments(this.post_id);
  }
};
</script>

<style scoped>
.comments-container {
  background: #80808038;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px;
}
.user-comment {
  background: white;
  margin-bottom: 20px;
  padding: 20px 10px;
}
.message {
  font-size: 18px;
  letter-spacing: 1px;
}
</style>