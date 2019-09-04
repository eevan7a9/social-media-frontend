<template>
  <main class="comments-container">
    <CommentAdd :post_id="post_id" />
    <div v-for="comment in postComments" :key="comment.id">
      <CommentItem :comment="comment" />
    </div>
  </main>
</template>

<script>
import CommentAdd from "./CommentAdd";
import CommentItem from "./CommentItem";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CommentsList",
  components: {
    CommentAdd,
    CommentItem
  },
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
  padding: 10px 25px;
}
</style>