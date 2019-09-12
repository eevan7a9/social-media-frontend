<template>
  <div id="app">
    <TopNavBar />
    <transition name="fade" mode="out-in">
      <router-view class="container" />
    </transition>
  </div>
</template>
<script>
import TopNavBar from "./components/TopNavBar";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    TopNavBar
  },
  methods: {
    ...mapActions([
      "getPosts",
      "getLikes",
      "getUsers",
      "getAllComments",
      "sortNewest"
    ])
  },
  computed: mapGetters(["allPosts"]),
  created() {
    this.getUsers().then(() => {
      this.getAllComments().then(() => {
        this.getLikes().then(() => {
          if (this.allPosts.length === 0) {
            this.getPosts().then(() => this.sortNewest());
          }
        });
      });
    });
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
body {
  background-image: radial-gradient(
    circle farthest-corner at 18.7% 37.8%,
    rgba(250, 250, 250, 1) 0%,
    rgba(225, 234, 238, 1) 90%
  );
}
#app {
  font-family: "Roboto", sans-serif;
  color: #333;
}
</style>
