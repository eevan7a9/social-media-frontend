import axios from "axios";

const state = {
    users: [],
    created_id: 9, // I am using Fake server so I mannualy created id for created user
    current_user: {}, // current user will be store here
}
const getters = {
    allUsers: function (state) {
        return state.users;
    },
    currentUser: (state) => state.current_user,
}
const actions = {
    getUsers: async ({ commit }) => {
        await axios.get("/users")
            .then(res => {
                commit("setUsers", res.data)
            })
        // .catch((err) => {
        //     console.log(err);
        // })
    },
    newUser: async ({ commit, state }, new_user) => {
        const date = new Date();
        await axios.post("/users", {
            id: state.created_id,
            username: new_user.username,
            email: new_user.email,
            password: new_user.password,
            created_at: `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`
        }).then(res => {
            state.created_id++; // I am using Fake Api so I mannualy increase id
            commit("addUser", res.data);
        })
    },
    newCurrentUser: async ({ commit, state }, signed_user) => {
        const check_user = state.users.filter(user =>
            user.email == signed_user.email && user.password == signed_user.password);
        if (check_user.length > 0) {
            commit("setCurrentUser", check_user[0]);
        } else {
            return Promise.reject("Wrong Credentials")
        }
    },
    removeCurrentUser: async ({commit}) => {
        await commit("clearCurrentUser");
    }
}
const mutations = {
    setUsers: (state, users) => state.users = users,
    addUser: (state, user) => state.users.unshift(user),
    setCurrentUser: (state, user) => {
        state.current_user = user;

    },
    clearCurrentUser: (state) => state.current_user = {},

}
// export
export default {
    state,
    getters,
    actions,
    mutations,
};