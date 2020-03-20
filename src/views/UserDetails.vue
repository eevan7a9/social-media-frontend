<template>
  <div class="user-details-wrapper">
    <UserInfo :user="user" v-if="user.id"></UserInfo>
    <UserPosts :userId="user.id" v-if="user.id"></UserPosts>
  </div>
</template>

<script>
import UserInfo from "@/components/users/UserInfo.vue";
import UserPosts from "@/components/posts/UserPosts.vue";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  components: {
    UserInfo,
    UserPosts
  },
  props: {
    id: Number
  },
  data() {
    return {
      user: {}
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
      this.toggleLoader(false);
    } else {
      try {
        const res = await axios.get(`/users/${this.id}`);
        this.user = res.data;
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
