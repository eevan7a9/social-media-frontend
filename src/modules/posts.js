import axios from "axios";

const state = {
    posts: [
        { title: "first title" }
    ]
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
                commit("setPosts", res.data)
            })
            .catch(() => {
                alert("server Error")
            })
    }

}
const mutations = {
    setPosts: (state, posts) => state.posts = posts,

}
// export
export default {
    state,
    getters,
    actions,
    mutations,
};