import axios from "axios";

const state = {
  users: [],
  current_user: {} // current user will be store here
};
const getters = {
  allUsers: state => state.users,
  currentUser: state => state.current_user
};
const actions = {
  getUsers: async ({ commit }) => {
    try {
      const result = await axios.get("/users");
      commit("setUsers", result.data);
    } catch (error) {
      alert(error);
    }
  },
  newUser: async ({ commit }, new_user) => {
    const date = new Date();
    try {
      const result = await axios.post("/users", {
        id: date.getTime(), // we generate Id base on date
        username: new_user.username,
        email: new_user.email,
        password: new_user.password,
        created_at: `${date.getFullYear()}/${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${date
          .getDate()
          .toString()
          .padStart(2, "0")}`
      });
      commit("addUser", result.data);
    } catch (error) {
      alert(error);
    }
  },
  newCurrentUser: async ({ commit, state }, signed_user) => {
    // we don't have a backend so we try & replicate the login process
    const check_user = state.users.find(
      user =>
        user.email == signed_user.email && user.password == signed_user.password
    );
    if (check_user) {
      commit("setCurrentUser", check_user);
    } else {
      return Promise.reject("Wrong Credentials");
    }
  },
  removeCurrentUser: ({ commit }) => {
    commit("clearCurrentUser");
  }
};
const mutations = {
  setUsers: (state, users) => (state.users = users),
  addUser: (state, user) => state.users.unshift(user),
  setCurrentUser: (state, user) => {
    state.current_user = user;
  },
  clearCurrentUser: state => (state.current_user = {})
};
// export
export default {
  state,
  getters,
  actions,
  mutations
};
