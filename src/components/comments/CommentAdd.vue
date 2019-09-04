<template>
  <main>
    <form @submit="submit">
      <div class="create-comment">
        <div>
          <h3>Luffy</h3>
          <label for="message">Comment</label>
        </div>
        <textarea class="bg-lightdient" v-model="message" id="message" cols="30" rows="3"></textarea>
      </div>
      <section class="section-submit">
        <button class="btn-submit bg-vuedient" type="submit">Done</button>
      </section>
    </form>
  </main>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CommentAdd",
  props: {
    post_id: Number
  },
  data() {
    return {
      message: ""
    };
  },
  methods: {
    ...mapActions(["addComment", "addPostComment"]),
    submit(e) {
      e.preventDefault();
      this.addComment({
        post_id: this.post_id,
        user_id: 1,
        user_username: "luffy",
        message: this.message
      }).then(()=>{
        this.addPostComment();
      });
    }
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