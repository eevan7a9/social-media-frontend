<template>
  <main>
    <section class="Sort">
      <SortPosts />
    </section>
    <section>
      <RecommendPosts />
    </section>
    <br />
    <section>
      <RecommendFollow />
    </section>
  </main>
</template>

<script>
import SortPosts from "./posts/SortPosts";
import RecommendPosts from "./posts/RecommendPosts";
import RecommendFollow from "./follow/RecommendFollow";
export default {
  name: "SideBar",
  components: {
    SortPosts,
    RecommendPosts,
    RecommendFollow
  }
};
</script>

<style scoped>
main {
  background: white;
  height: 100%;
  margin: 20px 20px 0 0;
  padding: 20px;
}
.Sort {
  margin-bottom: 20px;
}
</style>