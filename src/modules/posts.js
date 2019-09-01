import axios from "axios";

const state = {
    posts: [],
    created_id: 18, // serves as a holder for new fake post
}
const getters = {
    allPosts: function (state) {
        return state.posts;
    }
}
const actions = {
    getPosts: async ({ commit, rootState }) => {
        await axios.get("/posts")
            .then(res => {
                const likes = rootState.likes.likes // we access the state of likes module
                const comments = rootState.comments.comments; // we access the state of comments module
                const users = rootState.users.users; // we access the state of users module
                const posts = res.data // we store the result of our api request
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
    addPost: async ({ commit, rootState, state }, newPost) => {
        await axios.post("/posts", {
            id: state.created_id,
            user_id: newPost.user_id,
            title: newPost.title,
            created_at: newPost.created_at
        })
            .then(res => {
                state.created_id++; // we increase the new fake post id holder
                const users = rootState.users.users;
                const comments = rootState.comments.comments;
                const likes = rootState.likes.likes;
                const post = res.data;
                post.user_username = users.filter(user =>
                    user.id == post.user_id).map(user => user.username)[0];
                post.comments = comments.filter(comment => comment.post_id == post.id).length;
                post.likes = likes.filter(like => like.post_id == post.id).length;
                commit("insertPost", post);
            })
        // .catch(err => {
        //     console.error(err);
        // })
    }

}
const mutations = {
    setPosts: (state, posts) => {
        state.posts = posts;
    },
    insertPost: (state, post) => {
        state.posts.unshift(post);
    }

}
// export
export default {
    state,
    getters,
    actions,
    mutations,
};