import Vue from 'vue'
import Vuex from 'vuex'
import posts from './modules/posts'
import users from './modules/users'
import likes from './modules/likes'
import comments from './modules/comments'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    posts,
    likes,
    comments,
  }
})
