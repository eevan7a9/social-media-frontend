<template>
  <main>
    <div class="sign-in-container box-shadow-1">
      <form>
        <div class="input-fields">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" />
        </div>
        <div class="input-fields">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" />
        </div>
        <section class="submit-container">
          <button type="submit">Submit</button>
        </section>
      </form>
    </div>
    <p class="not-yet-registerd">Not yet Registered?</p>
  </main>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: ""
    };
  }
};
</script>

<style scoped>
main {
  height: 700px;
  width: 100%;
  padding: 30px 0;
}
.sign-in-container {
  background: white;
  padding: 30px 45px;
  border: 2px solid #4c926e;
  border-radius: 10px;
  width: 70%;
  margin-right: auto;
  margin-left: auto;
}
.input-fields {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-gap: 20px;
  padding: 20px 0;
}
.input-fields label {
  font-weight: 700;
  font-size: 18px;
  text-align: right;
  padding: 15px 0;
}
.input-fields input {
  font-weight: 400;
  font-size: 16px;
  padding: 15px 10px;
  border: 1.5px solid #4c926e;
  border-radius: 5px;
}
.submit-container {
  text-align: right;
}
.submit-container button {
  margin-top: 10px;
  background: #45ad78;
  border-color: white;
  border-radius: 5px;
  padding: 17px 15px;
  cursor: pointer;
  font-weight: 800;
  color: #fff;
}
.not-yet-registerd {
  padding: 40px 0;
  text-align: center;
  width: 100%;
  cursor: pointer;
}
@media (max-width: 800px) {
  .input-fields {
    grid-template-columns: 100px 1fr;
  }
  .submit-container {
    text-align: center;
  }
}
@media (max-width: 650px) {
  .input-fields {
    grid-template-columns: 1fr;
  }
  .input-fields label {
    text-align: left;
  }
  .submit-container {
    text-align: center;
  }
}
@media (max-width: 478px) {
  main {
    padding: 0;
  }
  .sign-in-container {
    width: 100%;
    border-radius: 0;
  }
  .input-fields label {
    padding: 5px 0;
    font-weight: 500;
  }
}
</style>