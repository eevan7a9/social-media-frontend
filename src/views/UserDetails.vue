<template>
  <div class="user-details-wrapper">
    <UserInfo :user="user" v-if="domReady"></UserInfo>
    <UserFollowing :following="user.following" v-if="domReady"></UserFollowing>
    <UserPosts :userId="user.id" v-if="domReady"></UserPosts>
  </div>
</template>

<script>
import UserInfo from "@/components/users/UserInfo.vue";
import UserFollowing from "@/components/users/UserFollowing.vue";
import UserPosts from "@/components/posts/UserPosts.vue";

import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  components: {
    UserInfo,
    UserFollowing,
    UserPosts
  },
  props: {
    id: Number
  },
  data() {
    return {
      user: {},
      domReady: false
    };
  },
  computed: mapGetters(["allPosts", "currentUser"]),
  methods: {
    ...mapActions(["toggleLoader", "initApplication"])
  },
  async created() {
    this.toggleLoader(true);
    if (!this.allPosts.length) {
      await this.initApplication();
    }
    if (this.id == this.currentUser.id) {
      this.user = this.currentUser;
      this.user.currentUser = true;
      this.domReady = true;
      this.toggleLoader(false);
    } else {
      try {
        const res = await axios.get(`/users/${this.id}`);
        this.user = res.data;
        const follows = await axios.get("/follows");
        // we get the  followings
        const following = follows.data
          .filter(follow => follow.follower == this.user.id)
          .map(follow => follow.following);
        // we add follower & following to our user
        this.user = {
          ...this.user,
          ...{ following: following }
        };
        this.domReady = true;
        setTimeout(() => {
          this.toggleLoader(false);
        }, 500);
      } catch (error) {
        alert(error);
      }
    }
  }
};
</script>

<style scoped>
.user-details-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
