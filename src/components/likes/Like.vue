<template>
  <div>
    <img
      :style="visitor ? 'cursor:not-allowed' : 'cursor:pointer'"
      class="icon-img"
      src="../../assets/icons/star.svg"
      data="star.svg"
      alt
      srcset
      @click="like"
    />
    <span class="star">{{likes.length}}</span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Like",
  props: {
    post_id: Number,
    likes: Array
  },
  data() {
    return {
      visitor: 0
    };
  },
  computed: mapGetters(["currentUser"]),
  methods: {
    ...mapActions([
      "addLike",
      "deleteLike",
      "addPostLikes",
      "subtractPostLikes"
    ]),
    like() {
      if (Object.keys(this.currentUser).length !== 0) {
        this.addLike({
          id: this.post_id,
          user_id: this.currentUser.id
        })
          .then(like => this.addPostLikes(like))
          .catch(like =>
            this.deleteLike(like.id).then(() => this.subtractPostLikes(like))
          );
      }
    }
  },
  created() {
    this.visitor = Object.keys(this.currentUser).length === 0 ? 1 : 0;
  }
};
</script>

<style scoped>
</style>