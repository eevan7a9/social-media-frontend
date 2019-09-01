import axios from "axios";

const state = {
    posts: [],
}
const getters = {
    allPosts: function (state) {
        return state.posts;
    }
}
const actions = {
    getPosts: async ({ commit, rootState }) => {
        await axios.get("https://my-json-server.typicode.com/eevan7a9/social-media-db/posts")
            .then(res => {
                const likes = rootState.likes.likes // we access the state of likes module
                const comments = rootState.comments.comments; // we access the state of comments module
                const users = rootState.users.users; // we access the state of users module
                let posts = res.data // we store the result of our api request
                posts.forEach(post => {
                    post.user_username = users.filter(user =>
                        user.id === post.user_id // we check if post belongs to the user
                    ).map(user => user.username)[0]; // we get the username of the user
                    post.comments = comments.filter(comment =>
                        comment.post_id === post.id // we check if comments belong to the post
                    ).length; // we get the number of comments belong to the post
                    post.likes = likes.filter(like =>
                        like.post_id == post.id
                    ).length;
                });
                commit("setPosts", posts);
            })
            .catch((e) => {
                alert(e);
            })
    },

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