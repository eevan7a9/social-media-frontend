import axios from "axios";

const state = {
    comments: [], // all comments
    post_Comments: [], // all comments of a single post
}
const getters = {
    allComments: (state) => state.comments,
    postComments: (state) => state.post_Comments,
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
    getPostComments: async ({ commit, rootState }, post_id) => {
        if (post_id > 17) { // we check if post exists in json fake server
            console.log("cant");
        } else {
            await axios.get(`/comments?post_id=${post_id}`)
                .then(res => {
                    const comments = res.data;
                    const users = rootState.users.users;
                    comments.forEach(comment => {
                        comment.user_username = users.filter(user =>
                            user.id == comment.user_id).map(user => user.username)[0];
                    });
                    commit("setPostComments", comments);
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }

}
const mutations = {
    setComments: (state, comments) => state.comments = comments,
    setPostComments: (state, comments) => state.post_Comments = comments,
}
// export
export default {
    state,
    getters,
    actions,
    mutations,
};