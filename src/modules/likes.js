import axios from "axios";

const state = {
    likes: [],
    created_id: 23,  // we are sing fake api, this holds value for new created, to avoid error
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
    },
    addLike: async ({ commit, state }, post) => {
        const posts = state.likes.filter(like => like.post_id == post.id && like.user_id == post.user_id)
        if (posts.length > 0) {
            return Promise.reject("already liked")
        } else {
            return await axios.post(`/likes`, {
                id: state.created_id,
                post_id: post.id,
                user_id: post.user_id
            })
                .then(res => {
                    state.created_id++; // we increase the value of our created_id holder
                    commit("insertLikes", res.data);
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    alert(err.data)
                })
        }

    },
    deleteLike: async ({ commit }, post) => {
        await commit("removeLikes", post);
    }
}
const mutations = {
    setLikes: (state, likes) => state.likes = likes,
    insertLikes: (state, like) => state.likes.unshift(like),
    removeLikes: (state, post) => state.likes = state.likes.filter(like => post.id != like.post_id || post.user_id != like.user_id),
}
// export
export default {
    state,
    getters,
    actions,
    mutations,
};