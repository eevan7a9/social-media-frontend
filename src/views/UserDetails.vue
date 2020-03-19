<template>
  <div class="details-wrapper">
    <div class="user-container">
      <div class="user-inner-container">
        <h1>User Details:</h1>
        <p>{{ id }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: Number
  }
};
</script>

<style scoped>
.details-wrapper {
  display: flex;
  justify-content: center;
}
.user-container {
  width: 80%;
  padding: 30px 25px;
  background: #fff;
  margin: 20px 0;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: -1px 8px 13px -11px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -1px 8px 13px -11px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 8px 13px -11px rgba(0, 0, 0, 0.75);
}
.user-inner-container {
  border: 3px solid #4c926e;
  border-radius: 10px;
  padding: 15px;
  color: #333;
}
@media (max-width: 900px) {
  .user-container {
    width: 90%;
  }
}
</style>
