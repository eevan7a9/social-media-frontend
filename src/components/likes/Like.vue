<template>
  <div>
    <svg
      :style="visitor ? 'cursor:not-allowed' : 'cursor:pointer'"
      class="feather feather-star"
      data="star.svg"
      alt
      srcset
      @click="like"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      :fill="fillStar()"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      />
    </svg>
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
    },
    fillStar() {
      const my_like = this.likes.filter(
        like => like.user_id === this.currentUser.id
      );
      return my_like.length > 0 ? "#45ad78" : "white";
    }
  },
  created() {
    this.visitor = Object.keys(this.currentUser).length === 0 ? 1 : 0;
  }
};
</script>

<style scoped>
</style>