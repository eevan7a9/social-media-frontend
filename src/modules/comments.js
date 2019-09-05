import axios from "axios";

const state = {
    comments: [], // all comments
    post_comments: [], // all comments of a single post
    created_id: 21,
}
const getters = {
    allComments: (state) => state.comments,
    postComments: (state) => state.post_comments,
}
const actions = {
    getAllComments: async ({ commit }) => {
        await axios.get("/comments")
            .then(res => {
                commit('setComments', res.data);
            })
            .catch((err) => {
                alert(err);
            })
    },
    getPostComments: ({ commit, rootState, state }, post_id) => {
        const comments = state.comments.filter(comment => comment.post_id === post_id)

        const users = rootState.users.users;
        comments.forEach(comment => {
            comment.user_username = users.filter(user =>
                user.id == comment.user_id).map(user => user.username)[0];
        });

        commit("setPostComments", comments);

    },
    addComment: async ({ state, commit }, comment) => {
        await axios.post(`/comments`, {
            id: state.created_id,
            post_id: comment.post_id,
            user_id: comment.user_id,
            message: comment.message
        })
            .then(res => {
                state.created_id++;
                comment = res.data;
                commit("addComment", comment);
            })
        // .catch(err => {
        //     console.error(err);
        // })
    },
    deleteComment: async ({ commit }, id) => {
        if (id > 20) { // we just check if id belongs to our fake server
            commit("removeComment", id)
        } else {
            // if comment's id exists in fake server
            await axios.delete(`/comments/${id}`)
                .then(() => {
                    commit("removeComment", id)
                })
            // .catch(err => {
            //     console.error(err);
            // })
        }
    },
    clearPostComments: async ({ commit }) => await commit("removePostComments"),
}
const mutations = {
    setComments: (state, comments) => state.comments = comments,
    setPostComments: (state, comments) => state.post_comments = comments,
    removePostComments: (state) => state.post_comments = {},
    addComment: (state, comment) => {
        state.comments.unshift(comment);
        state.post_comments.unshift(comment);
    },
    removeComment: (state, id) => {
        state.comments = state.comments.filter(comment => comment.id != id);
        state.post_comments = state.post_comments.filter(comment => comment.id != id);
    }
}
// export
export default {
    state,
    getters,
    actions,
    mutations,
};