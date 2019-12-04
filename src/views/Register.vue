<template>
  <div class="register-container">
    <div class="register-box box-shadow-2">
      <h1>REGISTER</h1>
      <form @submit="submit">
        <hr class="hr-green" />
        <div class="name-input">
          <label for="name">Username</label>
          <input type="text" v-model="username" id="username" />
        </div>
        <div class="error-container" v-if="err.username">
          <p class="error">Error :</p>
          <p class="error-required">Username required.</p>
        </div>
        <div class="email-input">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" />
        </div>
        <div class="error-container" v-if="err.email">
          <p class="error">Error :</p>
          <p class="error-required">Valid email address required.</p>
        </div>
        <div class="password-input">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" />
        </div>
        <div class="error-container" v-if="err.password">
          <p class="error">Error :</p>
          <p class="error-required">Password must be atleast 6 char long.</p>
        </div>
        <div class="password-input">
          <label for="confirm">Confirm Password</label>
          <input type="password" v-model="confirm" id="confirm" />
        </div>
        <div class="error-container" v-if="err.confirm">
          <p class="error">Error :</p>
          <p class="error-required">Password is not confirmed</p>
        </div>
        <section>
          <button type="submit">SUBMIT</button>
        </section>
      </form>
    </div> 
    <router-link :to="{name:'sign-in'}">
      <p class="already">Already registered?</p>
    </router-link>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirm: "",
      err: {
        username: false,
        email: false,
        password: false,
        confirm: false
      }
    };
  },
  methods: {
    ...mapActions(["newUser"]),
    validUsername() {
      return this.username;
    },
    validEmail() {
      let re = /\S+@\S+\.\S+/;
      return re.test(this.email);
    },
    validPassword() {
      return this.password.length > 5;
    },
    confirmPassword() {
      return this.password === this.confirm;
    },
    checkForm() {
      this.err.username = !this.validUsername()
        ? (this.err.username = true)
        : (this.err.username = false);
      this.err.email = !this.validEmail()
        ? (this.err.email = true)
        : (this.err.email = false);
      this.err.password = !this.validPassword()
        ? (this.err.password = true)
        : (this.err.password = false);
      this.err.confirm = !this.confirmPassword()
        ? (this.err.confirm = true)
        : (this.err.confirm = false);
      return (
        this.err.username ||
        this.err.email ||
        this.err.password ||
        this.err.confirm
      );
    },
    submit(e) {
      e.preventDefault();
      if (!this.checkForm()) {
        this.newUser({
          username: this.username,
          email: this.email,
          password: this.password
        }).then(() =>
          this.$router.push({ name: "sign-in", query: { path: "/sign-in" } })
        );
      }
    }
  }
};
</script>

<style scoped>
a{
  text-decoration: none;
}
.register-container {
  padding-top: 100px;
  width: 100%;
  min-height: 100vh;
}
.register-box {
  background: white;
  padding: 30px 45px;
  margin-left: auto;
  margin-right: auto;
  max-width: 700px;
  border: 2px solid #4c926e;
  border-radius: 10px;
}
.email-input,
.name-input,
.password-input {
  padding: 12px 0;
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-gap: 20px;
}
.email-input label,
.name-input label,
.password-input label {
  font-weight: 700;
  font-size: 18px;
  text-align: right;
  padding: 15px 0;
}
.email-input input,
.name-input input,
.password-input input {
  font-weight: 400;
  width: 100%;
  font-size: 18px;
  color: #4c926e;
  padding: 5px 5px;
  background: #f7f0f0;
  border: 0px solid;
  border-bottom: 2.5px solid #4c926e;
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
  border: #45ad78 solid 2px;
  padding: 17px 25px;
  cursor: pointer;
  font-weight: 800;
  color: #fff;
}
.register-box button:hover {
  background: #cae6d7;
  border-color: #45ad78;
  color: #45ad78;
  transition: 1s;
}
.already {
  margin-top: 30px;
  width: 100%;
  color: #036282;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
}
.error-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.error {
  text-align: right;
  font-weight: 600;
}
.error,
.error-required {
  color: red;
  font-size: 14px;
  padding: 5px 10px;
  font-style: italic;
}
@media (max-width: 700px) {
  .email-input,
  .name-input,
  .password-input {
    padding: 5px 0;
    grid-template-columns: 1fr;
    grid-gap: 0px;
  }
  .email-input label,
  .name-input label,
  .password-input label {
    font-weight: 500;
    font-size: 16px;
    text-align: left;
    padding: 5px 0;
  }
}
@media (max-width: 450px) {
  .register-container {
    padding: 0px;
  }
  .register-box {
    border-radius: 0;
  }
  .register-box section {
    text-align: center;
  }
}
</style>