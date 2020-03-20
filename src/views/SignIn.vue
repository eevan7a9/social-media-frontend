<template>
  <main>
    <div class="sign-in-container box-shadow-2">
      <h1>SIGN-IN</h1>
      <form @submit="signIn">
        <hr class="hr-green" />
        <div class="input-fields">
          <label for="email">Email</label>
          <input type="email" v-model.trim="email" id="email" />
        </div>
        <div class="input-fields">
          <label for="password">Password</label>
          <input type="password" v-model.trim="password" id="password" />
        </div>
        <section class="submit-container">
          <div>
            <h5>For Demo:</h5>
            <p>
              Email :
              <i>test@test.test</i> | Password :
              <i>password</i>
            </p>
          </div>
          <button type="submit">CONTINUE</button>
        </section>
      </form>
    </div>
    <router-link :to="{ name: 'register' }">
      <p class="not-yet-registerd">Not yet Registered?</p>
    </router-link>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SignIn",
  data() {
    return {
      email: "test@test.test",
      password: "password"
    };
  },
  computed: mapGetters(["allUsers"]),
  methods: {
    ...mapActions(["getUsers", "newCurrentUser", "getWhoToFollow"]),
    signIn(e) {
      e.preventDefault();
      this.newCurrentUser({
        email: this.email,
        password: this.password
      })
        .then(() => {
          this.$router.push({ name: "home", query: { path: "/" } });
          this.getWhoToFollow();
        })
        .catch(err => alert(err));
    }
  },
  async created() {
    if (!this.allUsers.length) {
      await this.getUsers();
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
main {
  height: 700px;
  width: 100%;
  padding-top: 70px;
}
.sign-in-container {
  background: white;
  max-width: 700px;
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
  width: 100%;
  font-size: 18px;
  color: #4c926e;
  padding: 5px 5px;
  background: #f7f0f0;
  border: 0px solid;
  border-bottom: 2.5px solid #4c926e;
}
.submit-container {
  display: flex;
  justify-content: space-between;
}
.submit-container i {
  color: #4c926e;
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
  margin-top: 30px;
  width: 100%;
  color: #036282;
  font-weight: bold;
  text-align: center;
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
