<template>
  <main>
    <div>{{postDetails.created_at}}</div>
    <div>
      <h3>{{postDetails.user_username}}</h3>
      <p>{{postDetails.title}}</p>
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
  computed: {
    ...mapGetters(["postDetails"])
  },
  methods: {
    ...mapActions(["viewPost"])
  },
  created() {
    this.viewPost(this.id);
  }
};
</script>

<style>
</style>