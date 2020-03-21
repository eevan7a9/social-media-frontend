<template>
  <div>
    <h4>Filter :</h4>
    <form>
      <ul>
        <li>
          All
          <input
            type="radio"
            name="filter"
            v-model="filter"
            value="false"
            @change="filterByAll"
          />
        </li>
        <li>
          Followed
          <input
            type="radio"
            name="filter"
            v-model="filter"
            value="true"
            @change="filterByFollowed"
          />
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "FilterPosts",
  data() {
    return {
      filter: true
    };
  },
  computed: {
    ...mapGetters(["currentUser", "showingAll"])
  },
  methods: {
    ...mapActions(["getPosts", "showFollowedPosts"]),
    filterByAll() {
      this.getPosts();
      this.$swal.fire({
        position: "top-end",
        icon: "success",
        title: "Showing All Posts",
        showConfirmButton: false,
        timer: 1500
      });
    },
    filterByFollowed() {
      if (this.currentUser.token) {
        this.showFollowedPosts();
        this.$swal.fire({
          position: "top-end",
          icon: "success",
          title: "Showing Followed Users",
          showConfirmButton: false,
          timer: 1500
        });
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
    }
  },
  created() {
    // filter is opposite of showingAll
    this.filter = !this.showingAll;
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}
li {
  width: 120px;
  text-align: right;
  letter-spacing: 1.5px;
  margin-bottom: 10px;
}
@media (max-width: 700px) {
  ul {
    display: flex;
  }
  div {
    display: flex;
  }
}
</style>
