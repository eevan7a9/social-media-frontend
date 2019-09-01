<template>
  <div class="create-container">
    <label for="title">
      Create new post
      <span class="plus">+</span>
    </label>
    <br />
    <textarea class="bg-lightdient" name="title" id="title" cols="30" rows="5"></textarea>
    <div>
      <button class="publish">PUBLISH</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostAdd"
};
</script>

<style>
#title {
  width: 100%;
  font-size: 18px;
  border: 2px solid #45ad78;
  border-radius: 10px;
  padding: 5px 10px;
  margin-top: 10px;
}
.create-container {
  margin: 20px 0;
  background: white;
  padding: 10px;
  border-radius: 10px;
}
.create-container label {
  font-weight: 800;
}
.create-container div {
  width: 100%;
  text-align: right;
}
.plus {
  background: #45ad78;
  padding: 5px 10px;
  border-radius: 3px;
  color: white;
}
.publish {
  margin-top: 10px;
  background: #45ad78;
  border-color: white;
  border-radius: 5px;
  padding: 7px 15px;
  cursor: pointer;
  font-weight: 800;
  color: #fff;
}
</style>