<template>
  <div class="create-container">
    <form @submit="publish">
      <label for="title">
        Create new post
        <span class="plus">+</span>
      </label>
      <br />
      <textarea class="bg-lightdient" v-model="title" id="title" cols="30" rows="5"></textarea>
      <div>
        <button class="publish" type="submit">PUBLISH</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "PostAdd",
  data() {
    return {
      title: ""
    };
  },
  methods: {
    ...mapActions(["addPost"]),
    publish(event) {
      event.preventDefault();
      const dt = new Date();
      const year = dt.getFullYear(); // we get current year
      const month = // we get current month
        dt.getMonth() + 1 < 10 ? `0${dt.getMonth() + 1}` : dt.getMonth() + 1;
      const date = dt.getDate(); // we get current date
      this.addPost({
        user_id: 1,
        title: this.title,
        created_at: `${year}/${month}/${date}`
      });
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
}
.create-container {
  margin: 20px 0;
  background: white;
  padding: 10px;
  border-radius: 10px;
}
.create-container label {
  font-weight: 800;
}
.create-container div {
  width: 100%;
  text-align: right;
}
.plus {
  background: #45ad78;
  padding: 5px 10px;
  border-radius: 3px;
  color: white;
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
</style>