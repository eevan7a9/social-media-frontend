<template>
  <div class="create-container">
    <form @submit="publish">
      <label for="title">
        Create new post
        <span class="plus">+</span>
      </label>
      <br />
      <br />
      <hr class="hr-green" />
      <div class="post-author">
        <p v-if="!visitor">{{ currentUser.username }} :</p>
      </div>
      <textarea
        class="bg-lightdient"
        v-model="title"
        id="title"
        cols="30"
        rows="3"
      ></textarea>
      <div class="publish-container">
        <!-- if user is visitor -->
        <p class="visitor" v-if="visitor">
          You need to Sign in, to publish a post.
        </p>
        <!-- is signed -->
        <p class="signed" v-else>Share something.</p>
        <button
          class="publish"
          type="submit"
          :style="visitor ? 'cursor:not-allowed' : 'cursor:pointer'"
        >
          PUBLISH
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "PostAdd",
  data() {
    return {
      title: "",
      visitor: 0
    };
  },
  computed: mapGetters(["currentUser"]),
  methods: {
    ...mapActions(["addPost"]),
    publish(event) {
      event.preventDefault();
      if (!this.visitor) {
        const dt = new Date();
        const year = dt.getFullYear(); // we get current year
        const month = // we get current month
          dt.getMonth() + 1 < 10 ? `0${dt.getMonth() + 1}` : dt.getMonth() + 1;
        const date = dt.getDate(); // we get current date
        this.addPost({
          user_id: this.currentUser.id,
          title: this.title,
          created_at: `${year}/${month}/${date}`
        }).then(() => {
          this.$swal.fire({
            icon: "success",
            title: "New Post!",
            text: "Successfully published new post."
            // footer: "<a href>Why do I have this issue?</a>"
          });
        });
        this.title = "";
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
    if (Object.keys(this.currentUser).length === 0) {
      this.visitor = 1;
    }
  }
};
</script>

<style>
#title {
  width: 100%;
  font-size: 18px;
  border: 2px solid #45ad78;
  border-radius: 10px;
  padding: 5px 10px;
  margin-top: 10px;
  resize: none;
}
.create-container {
  margin: 20px 0;
  background: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: -1px 8px 13px -11px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -1px 8px 13px -11px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 8px 13px -11px rgba(0, 0, 0, 0.75);
}
.create-container label {
  font-weight: 800;
  margin-bottom: 30px;
}
.plus {
  background: #45ad78;
  padding: 5px 10px;
  border-radius: 3px;
  color: white;
}
.publish-container {
  display: grid;
  grid-template-columns: 1fr auto;
}
.publish-container .visitor {
  padding: 20px;
  text-align: right;
  font-style: italic;
  color: red;
}
.publish-container .signed {
  padding: 20px;
  text-align: left;
  font-style: italic;
  color: green;
}

.publish {
  margin-top: 10px;
  background: #45ad78;
  border-color: white;
  border-radius: 5px;
  padding: 7px 15px;
  cursor: pointer;
  font-weight: 800;
  color: #fff;
}
.post-author {
  font-weight: 800;
  text-align: left;
  text-transform: capitalize;
  padding: 5px 10px;
}
</style>
