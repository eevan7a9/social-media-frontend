<template>
  <div class="user-info-container">
    <div class="user-inner-container">
      <h1>User info:</h1>
      <div class="inner-container-header">
        <div class="profile-container">
          <div>
            <img :src="user.photo" alt="" srcset="" />
          </div>
        </div>
        <button class="upload" v-if="user.currentUser">Upload</button>
        <button class="follow" v-else>Follow</button>
      </div>
      <div class="user-info">
        <div>
          <label for="username">Username:</label>
          <input type="text" :value="user.username" disabled />
        </div>
        <div>
          <label for="email">Email Address:</label>
          <input type="email" :value="user.email" disabled />
        </div>
        <div>
          <label>Joined:</label>
          <input type="text" :value="user.created_at" disabled />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object
  }
};
</script>

<style scoped>
.user-info-container {
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
.inner-container-header {
  margin-bottom: 20px;
  padding-left: 30px;
}
.user-inner-container > h1 {
  margin-bottom: 30px;
}
.profile-container > div {
  position: relative;
  width: 180px;
  background: #ebebe4;
  border-radius: 10px;
  border: 2px solid #4c926e;
  display: flex;
  justify-content: center;
  padding: 20px;
}
.inner-container-header button {
  margin-top: 10px;
  background: #4c926e;
  color: aliceblue;
  font-size: 16px;
  text-transform: uppercase;
  border-radius: 10px;
  border: solid 0px transparent;
  padding: 10px 15px;
  width: 180px;
}
.inner-container-header .upload {
  background: #007bff;
}
.profile-container > div > img {
  width: 100%;
  height: 140px;
  border: 2px solid #4c926e;
  border-radius: 100%;
}
.user-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
}
.user-info > div {
  display: flex;
  flex-direction: column;
}
.user-info > div > label {
  font-size: 18px;
}
.user-info > div > input {
  width: 100%;
  font-weight: 600;
  font-size: 18px;
  color: #333;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  border: 0 solid transparent;
}
@media (max-width: 900px) {
  .user-info-container {
    width: 90%;
  }
}
</style>
