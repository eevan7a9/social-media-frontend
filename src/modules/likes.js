import axios from "axios";

const state = {
    likes: []
}
const getters = {
    allLikes: function (state) {
        return state.likes;
    }
}
const actions = {
    getLikes: async ({ commit }) => {
        await axios.get("https://my-json-server.typicode.com/eevan7a9/social-media-db/likes")
            .then(res => {
                commit('setLikes', res.data);
            })
            .catch((err) => {
                alert(err);
            })
    }

}
const mutations = {
    setLikes: (state, likes) => state.likes = likes,

}
// export
export default {
    state,
    getters,
    actions,
    mutations,
};