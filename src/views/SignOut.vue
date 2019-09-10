<template>
  <main>
      <h1>Signing Out</h1>
  </main>
</template>

<script>
import {mapActions} from "vuex";
export default {
    name:"SignOut",
    methods:mapActions(["removeCurrentUser"]),
    created(){
        this.removeCurrentUser().then(() => this.$router.push({name:"sign-in", query:{path:"/sign-in"}}));

    }

}
</script>

<style>

</style>