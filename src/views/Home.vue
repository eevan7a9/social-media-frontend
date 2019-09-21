<template>
  <div class="home">
    <SideBar class="side" />
    <div class="main">
      <PostAdd />
      <div class="sort">
        <SortPosts />
      </div>
      <PostsList />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from "../components/SideBar";
import PostAdd from "../components/posts/PostAdd";
import SortPosts from "../components/posts/SortPosts";
import PostsList from "../components/posts/PostsList";

export default {
  name: "home",
  components: {
    SideBar,
    PostAdd,
    SortPosts,
    PostsList
  }
};
</script>
<style scoped>
.home {
  display: grid;
  grid-template-columns: 300px 1fr;
}
.sort {
  display: none;
}
@media (max-width: 700px) {
  .home {
    grid-template-columns: 1fr;
  }
  .main {
    order: -1;
  }
  .sort {
    display: block;
  }
}
</style>