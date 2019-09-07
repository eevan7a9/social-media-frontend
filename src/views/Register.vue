<template>
  <div class="register-container">
    <div class="register-box box-shadow-1">
      <h1>Register</h1>
      <form action>
        <hr class="hr-green" />
        <div class="name-input">
          <label for="name">Name</label>
          <input type="text" v-model="name" id="name" />
        </div>
        <div class="email-input">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" />
        </div>
        <div class="password-input">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" />
        </div>
        <div class="password-input">
          <label for="confirm">Confirm Password</label>
          <input type="password" v-model="confirm" id="confirm" />
        </div>
        <section>
          <button type="submit">Submit</button>
        </section>
      </form>
    </div>
    <p class="already">Already registered?</p>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirm: ""
    };
  }
};
</script>

<style scoped>
.register-container {
  height: 700px;
  padding: 50px 50px;
}
.register-box {
  background: white;
  padding: 30px 45px;
  border: 2px solid #4c926e;
  border-radius: 20px;
}
.register-box div {
  padding: 20px 0;
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-gap: 20px;
}
.register-box div label {
  font-weight: 700;
  font-size: 18px;
  text-align: right;
  padding: 15px 0;
}
.register-box div input {
  font-weight: 400;
  font-size: 16px;
  padding: 15px 10px;
  border: 1.5px solid #4c926e;
  border-radius: 5px;
}
.register-box section {
  width: 100%;
  text-align: right;
}
.register-box button {
  margin-top: 10px;
  background: #45ad78;
  border-color: white;
  border-radius: 5px;
  padding: 17px 15px;
  cursor: pointer;
  font-weight: 800;
  color: #fff;
}
.already {
  margin-top: 30px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}
</style>