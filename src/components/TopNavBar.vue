<template>
  <div id="nav" class="bg-vuedient">
    <div class="container top-nav-bar">
      <div>
        <router-link to="/" class="nav-item color-white">Home</router-link>
        <router-link to="/about" class="nav-item color-white">About</router-link>
      </div>
      <div>
        <router-link to="/register" class="nav-item color-white">
          <a>Register</a>
        </router-link>
        <router-link to="/sign-in" class="nav-item color-white">Sign in</router-link>
        <router-link to="/sign-out" class="nav-item color-white">Sign out</router-link>  
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNavBar"
};
</script>

<style scoped>
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