<template>
  <div
    id="nav"
    class="bg-vuedient"
    @mouseleave="
      userDropdown = false;
      mobileNav = false;
    "
  >
    <div class="container inner-nav">
      <div class="logo-menu-container">
        <div class="logo-container">
          <img src="@/assets/logo.png" alt="log" />
        </div>
        <button class="menu-btn-container" @click="mobileNav = !mobileNav">
          <img src="@/assets/icons/justify-align.svg" />
        </button>
      </div>
      <div class="nav-items-container" :class="{ shower: mobileNav }">
        <ul class="left-nav-list">
          <li @click="mobileNav = false">
            <router-link to="/" class="nav-item color-white">Home</router-link>
          </li>
          <li @click="mobileNav = false">
            <router-link to="/about" class="nav-item color-white"
              >About</router-link
            >
          </li>
        </ul>
        <ul class="right-nav-list">
          <li @click="mobileNav = false">
            <router-link
              to="/register"
              class="nav-item color-white"
              v-if="!currentUser.token"
            >
              Register
            </router-link>
          </li>
          <li @click="mobileNav = false">
            <router-link
              to="/sign-in"
              class="nav-item color-white"
              v-if="!currentUser.token"
              >Sign in</router-link
            >
          </li>
          <li class="mobile-nav-item" @click="mobileNav = false">
            <router-link
              :to="{ name: 'user', params: { id: currentUser.id } }"
              class="nav-item color-white"
              v-if="currentUser.token"
              >Account</router-link
            >
          </li>
          <li class="mobile-nav-item" @click="mobileNav = false">
            <router-link
              to="/sign-out"
              class="nav-item color-white"
              v-if="currentUser.token"
              >Sign Out</router-link
            >
          </li>
        </ul>
        <!-- Dropdown btn menu webview -->
        <div
          class="dropdown"
          v-if="currentUser.token"
          @click="userDropdown = !userDropdown"
        >
          <div class="dropbtn">
            {{ currentUser.username }}
            <img src="@/assets/icons/chevron-down.svg" />
          </div>
          <div class="dropdown-content" :class="userDropdown ? 'show' : ''">
            <router-link :to="{ name: 'user', params: { id: currentUser.id } }"
              >Account</router-link
            >
            <router-link to="/sign-out">Sign Out</router-link>
          </div>
        </div>
        <!--  Dropdown btn end -->
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
      userDropdown: false,
      mobileNav: false
    };
  },
  computed: mapGetters(["currentUser"]),
  methods: {}
};
</script>

<style scoped>
#nav {
  position: sticky;
  top: 0;
  margin: 0;
  z-index: 10;
  box-shadow: -1px 8px 13px -11px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -1px 8px 13px -11px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 8px 13px -11px rgba(0, 0, 0, 0.75);
}
.inner-nav {
  display: flex;
}
.logo-menu-container {
  display: flex;
  padding-left: 10px;
  justify-content: space-between;
  align-items: center;
}
.logo-container {
  height: 100%;
  display: flex;
  color: aliceblue;
  align-items: center;
}
.logo-container img {
  height: 50px;
  width: 100%;
}
.menu-btn-container {
  display: none;
  height: 100%;
  padding: 0 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: transparent;
  border: 0 solid transparent;
}
.menu-btn-container:focus {
  background: rgb(55, 187, 121);
}
.nav-items-container {
  width: 100%;
  overflow: visible;
  display: flex;
  justify-content: space-between;
  padding: 0;
}
ul.left-nav-list {
  display: flex;
  list-style: none;
  padding: 20px;
}
ul.right-nav-list {
  display: flex;
  list-style: none;
  padding: 20px;
}
.nav-item {
  text-decoration: none;
  font-size: 17px;
  letter-spacing: 1px;
  font-weight: 600;
  padding: 20px 20px;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.082);
}
.mobile-nav-item {
  display: none;
}
.dropdown {
  float: left;
  overflow: hidden;
  padding: 20px;
}
.dropdown:hover {
  background: rgb(55, 187, 121);
}
.dropdown .dropbtn {
  cursor: pointer;
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  font-size: 17px;
  letter-spacing: 1px;
  font-weight: 600;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
  height: 100%;
  display: flex;
}
.navbar a:hover,
.dropbtn {
  background-color: red;
  height: 100%;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}
.dropdown-content a:hover {
  background-color: #ddd;
}
.show {
  display: block;
}

@media (max-width: 1000px) {
  #nav {
    width: 100%;
    height: 50px;
  }
  .container {
    padding: 0 !important;
  }
  .inner-nav {
    flex-direction: column;
  }
  .menu-btn-container {
    display: block;
  }
  .nav-items-container {
    flex-direction: column;
    transform: translateY(-300px);
    padding: 0;
  }
  .shower {
    transform: translateY(0px);
    background: #333;
    transition: 0.5s;
  }
  ul.left-nav-list,
  ul.right-nav-list {
    width: 100%;
    flex-direction: column;
    padding: 0;
  }
  ul.left-nav-list li,
  ul.right-nav-list li {
    text-align: center;
  }
  .dropdown {
    display: none;
  }
  .nav-item {
    padding: 20px;
    width: 100%;
    display: block;
  }
  .mobile-nav-item {
    display: block;
  }
}
</style>
