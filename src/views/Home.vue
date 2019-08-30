<template>
  <div class="home">
    <SideBar class="side" />
    <PostsList class="main" />
  </div>
</template>

<script>
// @ is an alias to /src
import PostsList from "../components/PostsList";
import SideBar from "../components/SideBar";
export default {
  name: "home",
  components: {
    PostsList,
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