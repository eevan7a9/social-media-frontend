<template>
  <div id="nav" class="bg-vuedient">
    <div class="container">
      <router-link to="/" class="nav-item color-white">Home</router-link>
      <router-link to="/about" class="nav-item color-white">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNavBar"
};
</script>

<style scoped>
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