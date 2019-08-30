import axios from "axios";

const state = {
    posts: []
}
const getters = {
    allPosts: function (state) {
        return state.posts;
    }
}
const actions = {
    getPosts: async ({ commit }) => {
        await axios.get("https://my-json-server.typicode.com/eevan7a9/social-media-db/posts")
            .then(res => {
                const posts = res.data
                commit("setPosts", posts);
            })
            .catch((e) => {
                console.log(e)
            })
    }

}
const mutations = {
    setPosts: (state, posts) => {
        state.posts = posts;
    },

}
// export
export default {
    state,
    getters,
    actions,
    mutations,
};