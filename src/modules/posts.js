import axios from "axios";
import router from "../router";

const state = {
    posts: [],
    post_details: {},
    created_id: 18, // serves as a holder for new fake post
}
const getters = {
    allPosts: function (state) {
        return state.posts;
    },
    postDetails: (state) => state.post_details,
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
    },
    editPost: async ({ commit }, post) => {
        const date = new Date();
        const this_month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const date_day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        await axios.put(`/posts/${post.id}`, {
            user_id: post.user_id,
            title: post.title,
            created_at: `${date.getFullYear()}/${this_month}/${date_day}`,
        })
            .then(() => {
                post.created_at = `${date.getFullYear()}/${this_month}/${date_day}`;
                commit("updatePost", post);
            })
            .catch(() => {
                // error 404 will appear because we using fake server
                // to fix this, we catch the error and procceed to update
                post.created_at = `${date.getFullYear()}/${this_month}/${date_day}`;
                commit("updatePost", post);
            })
    },
    deletePost: async ({ commit }, id) => {
        if (id > 17) { // our fake server's last id of the post is 17.
            // we check if the id exist on the fake server or not
            // if not we just remove it rightaway.
            commit("removePost", id);
        } else {
            await axios.delete(`/posts/${id}`)
                .then(() => {
                    commit("removePost", id)
                })
        }
    },
    viewPost: ({ state, commit, rootState }, id) => {
        const post = state.posts.filter(post => post.id == id)[0];
        if (post == undefined) {
            router.push({ name: "home", query: { redirect: "/" } });
        } else {
            const users = rootState.users.users;
            const comments = rootState.comments.comments;
            const likes = rootState.likes.likes;

            post.user_username = users.filter(user =>
                user.id == post.user_id).map(user => user.username)[0];
            post.comments = comments.filter(comment => comment.post_id == post.id).length;
            post.likes = likes.filter(like => like.post_id == post.id).length;
            commit("setPostDetails", post);
        }
    }
}
const mutations = {
    setPosts: (state, posts) => state.posts = posts,
    insertPost: (state, post) => state.posts.unshift(post),
    updatePost: (state, updated_post) => state.posts.forEach(post => post.id == updated_post.id ? post = updated_post : post),
    removePost: (state, id) => state.posts = state.posts.filter(post => post.id != id),
    setPostDetails: (state, post_details) => state.post_details = post_details

}
// export
export default {
    state,
    getters,
    actions,
    mutations,
};