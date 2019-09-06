<template>
  <div>
    <img
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
import { mapActions } from "vuex";
export default {
  name: "Like",
  props: {
    post_id: Number,
    likes: Array
  },
  methods: {
    ...mapActions([
      "addLike",
      "deleteLike",
      "addPostLikes",
      "subtractPostLikes"
    ]),
    like() {
      this.addLike({
        id: this.post_id,
        user_id: 1
      })
        .then(like => this.addPostLikes(like))
        .catch(like =>
          this.deleteLike(like.id).then(() => this.subtractPostLikes(like))
        );
    }
  }
};
</script>

<style scoped>
</style>