import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import likes from './modules/likes'
import comments from './modules/comments'
import posts from './modules/posts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    likes,
    comments,
    posts,
  }
})
