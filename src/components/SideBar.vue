<template>
  <main>
    <section class="Sort">
      <FilterPosts />
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
import FilterPosts from './posts/FilterPosts'
import SortPosts from "./posts/SortPosts";
import RecommendPosts from "./posts/RecommendPosts";
import RecommendFollow from "./users/RecommendFollow";
export default {
  name: "SideBar",
  components: {
    FilterPosts,
    SortPosts,
    RecommendPosts,
    RecommendFollow
  }
};
</script>

<style scoped>
main {
  /* background: white; */
  height: 100%;
  margin: 20px 20px 0 0;
  padding: 20px;
}
section {
  background: white;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: -1px 8px 13px -11px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -1px 8px 13px -11px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 8px 13px -11px rgba(0, 0, 0, 0.75);
}
.Sort {
  margin-bottom: 20px;
}
</style>
