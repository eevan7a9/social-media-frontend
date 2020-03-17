import axios from "axios";

const state = {
  likes: []
};
const getters = {
  allLikes: function(state) {
    return state.likes;
  }
};
const actions = {
  getLikes: async ({ commit }) => {
    try {
      const result = await axios.get(
        "https://my-json-server.typicode.com/eevan7a9/social-media-db/likes"
      );
      commit("setLikes", result.data);
    } catch (err) {
      alert(err);
    }
  },
  addLike: async ({ commit, state }, post) => {
    try {
      const result = await axios.post(`/likes`, {
        id: state.created_id,
        post_id: post.id,
        user_id: post.user_id
      });
      commit("insertLikes", result.data);
      return result.data;
    } catch (err) {
      alert(err);
      return err;
    }
  },
  deleteLike: ({ commit }, id) => {
    commit("removeLikes", id);
  }
};
const mutations = {
  setLikes: (state, likes) => (state.likes = likes),
  insertLikes: (state, like) => state.likes.unshift(like),
  removeLikes: (state, id) =>
    (state.likes = state.likes.filter(like => like.id != id))
};
// export
export default {
  state,
  getters,
  actions,
  mutations
};
