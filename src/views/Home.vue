<template>
  <div class="home">
    <SideBar class="side" />
    <Posts class="main" />
  </div>
</template>

<script>
// @ is an alias to /src
import Posts from "../components/Posts";
import SideBar from "../components/SideBar";
export default {
  name: "home",
  components: {
    Posts,
    SideBar
  }
};
</script>
<style scoped>
.home {
  display: grid;
  grid-template-columns: 300px 1fr;
}
</style>