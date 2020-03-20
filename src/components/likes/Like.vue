<template>
  <div>
    <div>
      <transition name="bounce_" mode="out-in">
        <svg
          :key="likes.length"
          :style="!currentUser.token ? 'cursor:not-allowed' : 'cursor:pointer'"
          class="feather feather-star"
          data="star.svg"
          @click.stop="like"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          :fill="userLiked() > 0 ? 'rgb(25, 147, 85)' : '#fff'"
          stroke="currentColor"
          :stroke-width="userLiked() > 0 ? 1 : 2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          />
        </svg>
      </transition>
      <span class="star">{{ likes.length }}</span>
    </div>
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
  computed: mapGetters(["currentUser"]),
  methods: {
    ...mapActions([
      "addLike",
      "deleteLike",
      "addPostLikes",
      "subtractPostLikes"
    ]),
    async like() {
      if (this.currentUser.token) {
        // we find if user already liked
        const foundLiked = this.likes.find(
          like => like.user_id == this.currentUser.id
        );
        if (foundLiked) {
          // remove like if user already liked
          this.deleteLike(foundLiked.id);
          this.subtractPostLikes(foundLiked);
        } else {
          try {
            const result = await this.addLike({
              id: this.post_id,
              user_id: this.currentUser.id
            });
            this.addPostLikes(result);
          } catch (error) {
            alert(error);
          }
        }
      } else {
        this.$swal
          .fire({
            icon: "info",
            title: "Not Allowed!",
            text: "Sorry, you need to register & sign-in"
          })
          .then(() => {
            this.$router.push({ name: "sign-in" });
          });
      }
    },
    userLiked() {
      const my_like = this.likes.filter(
        like => like.user_id === this.currentUser.id
      );
      return my_like.length > 0 ? 1 : 0;
    }
  }
};
</script>

<style scoped></style>
