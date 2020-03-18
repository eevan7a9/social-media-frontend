<template>
  <div id="app">
    <TopNavBar />
    <FullPageLoader v-if="showLoader" />
    <transition name="fade" mode="out-in">
      <router-view class="container" />
    </transition>
  </div>
</template>
<script>
import TopNavBar from "./components/TopNavBar";
import FullPageLoader from "./components/FullPageLoader";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    TopNavBar,
    FullPageLoader
  },
  methods: {
    ...mapActions([
      "getPosts",
      "getLikes",
      "getUsers",
      "getAllComments",
      "sortNewest",
      "getWhoToFollow",
      "toggleLoader"
    ])
  },
  computed: mapGetters(["allPosts", "showLoader"]),

  async created() {
    this.toggleLoader(true);
    await this.getUsers();
    await this.getAllComments();
    await this.getLikes();
    await this.getPosts();
    await this.sortNewest();
    await this.getWhoToFollow();
    setTimeout(() => {
      this.toggleLoader(false);
    }, 500);
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
