<template>
  <main>
   <section>
     <RecommendPosts />
   </section>
  </main>
</template>

<script>
import RecommendPosts from "./posts/RecommendPosts";
export default {
  name: "SideBar",
  components:{
    RecommendPosts
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

</style>