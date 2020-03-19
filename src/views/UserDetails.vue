<template>
  <div class="user-details-wrapper">
    <UserInfo :user="user" v-if="user.id"></UserInfo>
  </div>
</template>

<script>
import UserInfo from "@/components/users/UserInfo.vue";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  components: {
    UserInfo
  },
  props: {
    id: Number
  },
  data() {
    return {
      user: {}
    };
  },
  computed: mapGetters(["currentUser"]),
  async created() {
    if (this.id == this.currentUser.id) {
      this.user = this.currentUser;
      this.user.currentUser = true;
    } else {
      try {
        const res = await axios.get(`/users/${this.id}`);
        this.user = res.data;
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
  justify-content: center;
}
</style>
