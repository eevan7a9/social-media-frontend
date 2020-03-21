<template>
  <div class="home">
    <SideBar class="side" />
    <div class="main">
      <PostAdd />
      <div class="sort">
        <FilterPosts />
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
import FilterPosts from "../components/posts/FilterPosts";
import SortPosts from "../components/posts/SortPosts";
import PostsList from "../components/posts/PostsList";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "home",
  components: {
    SideBar,
    PostAdd,
    FilterPosts,
    SortPosts,
    PostsList
  },
  methods: {
    ...mapActions([
      "initApplication",
      "sortNewest",
      "getWhoToFollow",
      "toggleLoader"
    ])
  },
  computed: mapGetters(["allPosts", "showLoader"]),

  async created() {
    if (!this.allPosts.length) {
      this.toggleLoader(true);
      await this.initApplication();
      setTimeout(() => {
        this.toggleLoader(false);
      }, 500);
    }
    await this.sortNewest();
    await this.getWhoToFollow();
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
