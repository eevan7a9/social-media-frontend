<template>
  <main>
    <form @submit="submit">
      <div class="create-comment">
        <div>
          <h3 v-if="!visitor">{{ currentUser.username }}</h3>
          <h3 v-else>Stranger</h3>
          <label for="message">Comment</label>
        </div>
        <textarea
          class="bg-lightdient"
          v-model="message"
          id="message"
          cols="30"
          rows="3"
        ></textarea>
      </div>
      <section class="section-submit">
        <button
          class="btn-submit bg-vuedient"
          type="submit"
          :style="visitor ? 'cursor:not-allowed;' : 'cursor:pointer;'"
        >
          Done
        </button>
      </section>
    </form>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CommentAdd",
  props: {
    post_id: Number
  },
  data() {
    return {
      message: "",
      visitor: 0
    };
  },
  computed: mapGetters(["currentUser"]),
  methods: {
    ...mapActions(["addComment", "addPostComment"]),
    submit(e) {
      e.preventDefault();
      if (!this.visitor) {
        this.addComment({
          post_id: this.post_id,
          user_id: this.currentUser.id,
          user_username: this.currentUser.username,
          message: this.message
        }).then(() => {
          this.message = "";
          this.addPostComment().then(() => {
            this.$swal.fire({
              icon: "success",
              title: "Well done!",
              text: "Success, comment submitted!"
              //   footer: "<a href>Why do I have this issue?</a>"
            });
          });
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
    this.visitor = Object.keys(this.currentUser).length === 0 ? 1 : 0;
  }
};
</script>

<style scoped>
main {
  border-radius: 10px;
  padding: 20px 10px;
  background: white;
  margin-bottom: 30px;
}
label {
  margin-right: 10px;
  font-size: 20px;
}
textarea {
  width: 100%;
}

button {
  height: 40px;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 15px;
  color: white;
  font-weight: 900;
  cursor: pointer;
}
#message {
  width: 100%;
  font-size: 18px;
  border: 2px solid #45ad78;
  border-radius: 10px;
  padding: 5px 10px;
  margin-top: 10px;
}
.section-submit {
  margin-top: 10px;
  width: 100%;
  text-align: right;
}
.create-comment {
  display: flex;
}
</style>
