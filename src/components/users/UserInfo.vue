<template>
  <div class="user-info-container">
    <div class="user-inner-container">
      <h1>User info:</h1>
      <div class="inner-container-header">
        <div class="profile-container">
          <div>
            <img :src="user.photo" alt="" srcset="" />
          </div>
        </div>
        <button class="upload" v-if="user.currentUser">Upload</button>
        <button
          class="follow"
          :class="{ already: following }"
          @click="toggleFollow(user.id)"
          v-else
        >
          <span v-if="following"
            >Following
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" /></svg
          ></span>
          <span v-else>follow</span>
        </button>
      </div>
      <div class="user-info">
        <div>
          <label for="username">Username:</label>
          <input type="text" :value="user.username" disabled />
        </div>
        <div>
          <label for="email">Email Address:</label>
          <input type="email" :value="user.email" disabled />
        </div>
        <div>
          <label>Joined:</label>
          <input type="text" :value="user.created_at" disabled />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    user: Object
  },
  data() {
    return {
      following: false
    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    ...mapActions(["followUser", "unfollowUser"]),
    toggleFollow(id) {
      if (this.following) {
        this.$swal
          .fire({
            title: "Are you sure?",
            text: `You're about to unfollow ${this.user.username}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, unfollow!"
          })
          .then(result => {
            if (result.value) {
              this.unfollowUser(id);
              this.following = false;
              this.$swal.fire(
                "Unfollowed!",
                `You unfollowed ${this.user.username}.`,
                "success"
              );
            }
          });
      } else {
        this.followUser(id);
        this.following = true;
        this.$swal.fire({
          position: "top-end",
          icon: "success",
          title: `Now following ${this.user.username}`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  },
  created() {
    if (this.currentUser.token) {
      const isFollowed = this.currentUser.following.filter(
        item => item == this.user.id
      );
      this.following = isFollowed.length;
    }
  }
};
</script>

<style scoped>
.user-info-container {
  width: 80%;
  padding: 30px 25px;
  background: #fff;
  margin: 20px 0;
  border-radius: 10px;
  box-shadow: -1px 8px 13px -11px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -1px 8px 13px -11px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 8px 13px -11px rgba(0, 0, 0, 0.75);
}
.user-inner-container {
  border: 3px solid #4c926e;
  border-radius: 10px;
  padding: 15px;
  color: #333;
}
.inner-container-header {
  margin-bottom: 20px;
  padding-left: 30px;
}
.user-inner-container > h1 {
  margin-bottom: 30px;
}
.profile-container > div {
  position: relative;
  width: 180px;
  background: #ebebe4;
  border-radius: 10px;
  border: 2px solid #4c926e;
  display: flex;
  justify-content: center;
  padding: 20px;
}
.inner-container-header button {
  margin-top: 10px;
  background: #4c926e;
  color: aliceblue;
  font-size: 16px;
  text-transform: uppercase;
  border-radius: 10px;
  border: solid 0px transparent;
  padding: 10px 15px;
  width: 180px;
}
.inner-container-header button {
  margin-top: 10px;
  background: #4c926e;
  color: aliceblue;
  font-size: 16px;
  text-transform: uppercase;
  border-radius: 10px;
  border: solid 0px transparent;
  padding: 10px 15px;
  width: 180px;
  font-weight: 600;
  cursor: pointer;
}
.inner-container-header button span {
  display: flex;
  align-items: center;
  justify-content: center;
}
.inner-container-header .already {
  background: aliceblue;
  border: 2px solid #4c926e;
  color: #4c926e;
}
.inner-container-header .upload {
  background: #007bff;
}
.profile-container > div > img {
  width: 100%;
  height: 140px;
  border: 2px solid #4c926e;
  border-radius: 100%;
}
.user-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
}
.user-info > div {
  display: flex;
  flex-direction: column;
}
.user-info > div > label {
  font-size: 18px;
}
.user-info > div > input {
  width: 100%;
  font-weight: 600;
  font-size: 18px;
  color: #333;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  border: 0 solid transparent;
}
@media (max-width: 700px) {
  .user-info-container {
    width: 95%;
  }
}
</style>
