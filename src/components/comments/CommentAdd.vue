<template>
  <main>
    <form action>
      <div class="create-comment">
        <div>
          <h3>Luffy</h3>
          <label for="message">Comment</label>
        </div>
        <textarea class="bg-lightdient" v-bind="message" id="message" cols="30" rows="5"></textarea>
      </div>
      <section class="section-submit">
        <button class="btn-submit bg-vuedient" type="submit">Submit</button>
      </section>
    </form>
  </main>
</template>

<script>
// import {mapActions} from "vuex";
export default {
  name: "CommentAdd"
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
  font-size: 18px;
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