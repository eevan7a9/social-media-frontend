<template>
  <main>
    <transition-group name="slide-fade" tag="div">
      <div v-for="post in allPosts" :key="post.id">
        <PostItem
          :post="post"
          data-aos="fade-up"
          data-aos-offset="-100"
          data-aos-delay="10"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="bottom-bottom"
        />
      </div>
    </transition-group>
  </main>
</template>

<script>
import PostItem from "./PostItem";
import { mapGetters } from "vuex";
export default {
  name: "PostsList",
  components: {
    PostItem
  },
  data() {
    return {
      name: "evan"
    };
  },
  computed: mapGetters(["allPosts"])
};
</script>

<style scoped>
.fade-leave-active {
  /* when post is deleted we see transition effect */
  transition: opacity 1s;
}
</style>
