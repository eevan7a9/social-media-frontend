<template>
  <div>
    <h4>Looking to follow someone?</h4>
    <ul>
      <li
        class="recomend-users"
        v-for="(user, index) in usersToFollow"
        :key="index"
        @click="visitUser(user.id)"
      >
        <a>
          <h5>{{ user.username }}</h5>
          <small>
            <i>- {{ user.created_at }}</i>
          </small>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["usersToFollow"])
  },
  methods: {
    visitUser(id) {
      this.$router.push({ name: "user", params: { id: id } });
    }
  }
};
</script>

<style scoped>
h4 {
  margin-bottom: 15px;
}
ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}
li {
  width: 100%;
  margin: 0;
  padding: 0;
}
.recomend-users {
  padding: 10px 10px;
  border: 1px solid #45ad78;
  border-radius: 5px;
  margin-bottom: 5px;
  font-size: 15px;
  cursor: pointer;
}
.recomend-users:hover {
  background: #b5e9ce;
  transition: 0.5s;
}
a {
  text-decoration: none;
  color: #333;
}
</style>
