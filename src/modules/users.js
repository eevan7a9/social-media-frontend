import axios from "axios";

const state = {
    users: []
}
const getters = {
    allUsers: function (state) {
        return state.users;
    }
}
const actions = {
    getUsers: async ({ commit }) => {
        await axios.get("https://my-json-server.typicode.com/eevan7a9/social-media-db/users")
            .then(res => {
                commit("setUsers", res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

}
const mutations = {
    setUsers: (state, users) => state.users = users,

}
// export
export default {
    state,
    getters,
    actions,
    mutations,
};