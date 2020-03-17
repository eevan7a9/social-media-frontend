<template>
  <div id="nav" class="bg-vuedient">
    <div class="container top-nav-bar">
      <div>
        <router-link to="/" class="nav-item color-white">Home</router-link>
        <router-link to="/about" class="nav-item color-white">About</router-link>
      </div>
      <div>
        <router-link
          to="/register"
          class="nav-item color-white"
          v-if="Object.keys(currentUser).length == 0"
        >
          <a>Register</a>
        </router-link>
        <router-link
          to="/sign-in"
          class="nav-item color-white"
          v-if="Object.keys(currentUser).length == 0"
        >Sign in</router-link>
        <router-link to="/sign-out" class="nav-item color-white" v-else>Sign out</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TopNavBar",
  data() {
    return {
      visitor: 1
    };
  },
  computed: mapGetters(["currentUser"])
  // created(){
  //   if (Object.keys(this.currentUser).length != 0) {
  //     this.visitor = 1;
  //   }
  // }
};
</script>

<style scoped>
#nav {
  position: sticky;
  top: 0;
  z-index: 10;
}
.top-nav-bar {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
}
.nav-item {
  text-decoration: none;
  font-size: 17px;
  letter-spacing: 1px;
  font-weight: 600;
  padding: 20px 20px;
}

.nav-item:hover {
  background: rgb(55, 187, 121);
}
</style>