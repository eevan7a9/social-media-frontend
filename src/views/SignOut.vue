<template>
  <main>
    <h1>Signing Out</h1>
  </main>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SignOut",
  methods: mapActions(["removeCurrentUser"]),
  created() {
    this.removeCurrentUser().then(() =>
      this.$router.push({ name: "sign-in", query: { path: "/sign-in" } })
    );
  },
  destroyed() {
    this.$swal.fire({
      icon: "success",
      title: "Signed-out!",
      text: "We're looking forward to see you."
      //   footer: "<a href>Why do I have this issue?</a>"
    });
  }
};
</script>

<style>
</style>