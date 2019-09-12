<template>
  <div>
    <h4>Sort :</h4>
    <ul>
      <li>
        Newest
        <input type="radio" name="sort" v-model="sort" value="1" @change="sortByNewest" />
      </li>
      <li>
        Oldest
        <input type="radio" name="sort" v-model="sort" value="2" @change="sortByOldest" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SortPosts",
  data() {
    return {
      sort: 1
    };
  },
  methods: {
    ...mapActions(["sortOldest", "sortNewest"]),
    sortByOldest() {
      this.sortOldest();
    },
    sortByNewest() {
      this.sortNewest();
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}
li {
  width: 120px;
  text-align: right;
  letter-spacing: 1.5px;
  margin-bottom: 10px;
}
</style>