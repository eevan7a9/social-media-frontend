<template>
  <div id="app">
    <div id="nav" class="bg-vuedient">
      <div class="container">
        <router-link to="/" class="nav-item color-white">Home</router-link>
        <router-link to="/about" class="nav-item color-white">About</router-link>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <router-view class="container" />
    </transition>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["getPosts", "getLikes", "getUsers", "getAllComments"])
  },
  computed: mapGetters(["allPosts"]),
  created() {
    this.getUsers().then(() => {
      this.getAllComments().then(() => {
        this.getLikes().then(() => {
          if (this.allPosts.length === 0) {
            this.getPosts();
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
#nav {
  line-height: 40px;
}
.nav-item {
  text-decoration: none;
  font-size: 17px;
  letter-spacing: 1px;
  font-weight: 600;
  padding: 0 10px;
}
</style>
