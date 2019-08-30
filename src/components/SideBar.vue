<template>
  <main>
    <h4>Recent Posts</h4>
    <ul class="recent-posts">
      <li class="recent-items">Lorem ipsum dolor sit amet.</li>
      <li
        class="recent-items"
      >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, minima.</li>
      <li
        class="recent-items"
      >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, minima.</li>
      <li
        class="recent-items"
      >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, minima.</li>
    </ul>
  </main>
</template>

<script>
export default {
  name: "SideBar"
};
</script>

<style scoped>
main {
  background: white;
  height: 100%;
  margin: 20px 20px 0 0;
  padding: 20px;
}
h4 {
  margin-bottom: 15px;
}
ul {
  list-style: none;
}
.recent-items {
  padding: 10px 5px;
  border: 1px solid rgb(148, 141, 141);
}
</style>