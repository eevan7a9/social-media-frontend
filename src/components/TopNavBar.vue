<template>
  <div id="nav" class="bg-vuedient" @mouseleave="openDropdown = false">
    <div class="container top-nav-bar">
      <div>
        <router-link to="/" class="nav-item color-white">Home</router-link>
        <router-link to="/about" class="nav-item color-white"
          >About</router-link
        >
      </div>
      <div>
        <router-link
          to="/register"
          class="nav-item color-white"
          v-if="!currentUser.token"
        >
          <a>Register</a>
        </router-link>
        <router-link
          to="/sign-in"
          class="nav-item color-white"
          v-if="!currentUser.token"
          >Sign in</router-link
        >
      </div>
      <div
        class="dropdown"
        @click="openDropdown = true"
        v-if="currentUser.token"
      >
        <a class="color-white">
          User
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </a>
        <ul :style="openDropdown ? 'display:block' : 'display:none'">
          <li>
            <router-link :to="{ name: 'user', params: { id: currentUser.id } }"
              >Account</router-link
            >
          </li>
          <li>
            <router-link to="/sign-out">Sign out</router-link>
          </li>
        </ul>
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
      visitor: 1,
      openDropdown: false
    };
  },
  computed: mapGetters(["currentUser"]),
  methods: {}
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
  overflow: visible;
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
.dropdown {
  position: relative;
  cursor: pointer;
}
.dropdown a {
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dropdown ul {
  display: none;
  margin-top: 20px;
  position: absolute;
  list-style-type: none;
  width: 150px;
  background: #fff;
  right: 0;
}
.dropdown ul li {
  line-height: 42px;
  padding: 20px;
  text-align: center;
  width: 100%;
  cursor: pointer;
}
.dropdown ul li a {
  text-decoration: none;
  color: #333;
}
.dropdown ul li:hover {
  background: aliceblue;
}
</style>
