import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import users from "./modules/users";
import likes from "./modules/likes";
import comments from "./modules/comments";
import posts from "./modules/posts";
import pageLoader from "./modules/fullPageLoader";

Vue.use(Vuex);
axios.defaults.baseURL =
  "https://my-json-server.typicode.com/eevan7a9/social-media-db";
export default new Vuex.Store({
  actions: {
    async initApplication() {
      await this.dispatch("getUsers");
      await this.dispatch("getAllComments");
      await this.dispatch("getLikes");
      await this.dispatch("getPosts");
    }
  },
  modules: {
    users,
    likes,
    comments,
    posts,
    pageLoader
  }
});
