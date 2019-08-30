import axios from "axios";

const state = {
    comments: []
}
const getters = {
    allComments: function (state) {
        return state.comments;
    }
}
const actions = {
    getComments: async ({ commit }) => {
        await axios.get("https://my-json-server.typicode.com/eevan7a9/social-media-db/comments")
            .then(res => {
                commit('setComments', res.data);
            })
            .catch((err) => {
                alert(err);
            })
    }

}
const mutations = {
    setComments: (state, comments) => state.comments = comments,

}
// export
export default {
    state,
    getters,
    actions,
    mutations,
};