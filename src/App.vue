<template>
  <div id="app">
    <TopNavBar />
    <FullPageLoader v-show="showLoader" />
    <transition name="fade" mode="out-in">
      <router-view :key="$route.fullPath" class="container" />
    </transition>
  </div>
</template>
<script>
import TopNavBar from "./components/TopNavBar";
import FullPageLoader from "./components/FullPageLoader";
import { mapGetters } from "vuex";
export default {
  components: {
    TopNavBar,
    FullPageLoader
  },
  computed: mapGetters(["showLoader"])
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
