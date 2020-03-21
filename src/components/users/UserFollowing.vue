<template>
  <div class="user-following-container">
    <div class="user-inner-container">
      <h1>This user is following:</h1>
      <div class="following">
        <div
          class="profile-container"
          v-for="user of users"
          :key="user.id"
          @click="visitUser(user.id)"
        >
          <div>
            <img :src="user.photo" alt="" srcset="" />
          </div>
          <h3>{{ user.username }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "userFollowing",
  props: {
    following: Array
  },
  data() {
    return {
      users: []
    };
  },
  computed: {
    ...mapGetters(["allUsers"])
  },
  methods: {
    visitUser(id) {
      this.$router.push({ name: "user", params: { id: id } });
    }
  },
  created() {
    this.users = this.allUsers.filter(user => this.following.includes(user.id));
  }
};
</script>

<style scoped>
.user-following-container {
  width: 80%;
  padding: 30px 25px;
  background: #fff;
  margin: 20px 0;
  border-radius: 10px;
  cursor: pointer;
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
.following {
  display: flex;
  flex-wrap: wrap;
}
.profile-container {
  padding: 5px 10px;
}
.profile-container > div {
  position: relative;
  width: 140px;
  background: #ebebe4;
  border-radius: 10px;
  border: 2px solid #4c926e;
  display: flex;
  justify-content: center;
  padding: 20px;
}

.profile-container > div > img {
  width: 100%;
  height: 100px;
  border: 2px solid #4c926e;
  border-radius: 100%;
}
@media (max-width: 700px) {
  .user-following-container {
    width: 95%;
  }
  .user-inner-container {
    padding: 0;
  }
}
</style>
