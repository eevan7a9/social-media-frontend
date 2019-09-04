<template>
  <div class="home">
    <SideBar class="side" />
    <div class="main">
      <PostAdd />
      <PostsList />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from "../components/SideBar";
import PostAdd from "../components/posts/PostAdd";
import PostsList from "../components/posts/PostsList";

export default {
  name: "home",
  components: {
    SideBar,
    PostAdd,
    PostsList
  }
};
</script>
<style scoped>
.home {
  display: grid;
  grid-template-columns: 300px 1fr;
}
</style>