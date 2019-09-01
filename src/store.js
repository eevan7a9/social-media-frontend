import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import users from './modules/users'
import likes from './modules/likes'
import comments from './modules/comments'
import posts from './modules/posts'


Vue.use(Vuex)
axios.defaults.baseURL = "https://my-json-server.typicode.com/eevan7a9/social-media-db";
export default new Vuex.Store({
  modules: {
    users,
    likes,
    comments,
    posts,
  }
})
