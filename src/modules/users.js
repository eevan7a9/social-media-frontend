import axios from "axios";

const state = {
  users: [],
  // current user will be store here
  current_user: JSON.parse(localStorage.getItem("user_token")) || {},
  whoToFollow: [] // atleast 4 random users to follow
};
const getters = {
  allUsers: state => state.users,
  currentUser: state => state.current_user,
  usersToFollow: state => state.whoToFollow
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
    let check_user = state.users.find(
      user =>
        user.email == signed_user.email && user.password == signed_user.password
    );
    if (check_user) {
      const follows = await axios.get("/follows");
      // we get the followers & followings
      const follower = follows.data
        .filter(follow => follow.following == check_user.id)
        .map(follow => follow.follower);
      const following = follows.data
        .filter(follow => follow.follower == check_user.id)
        .map(follow => follow.following);
      // we add follower & following to our user
      check_user = {
        ...check_user,
        ...{ token: Date.now(), follower: follower, following: following }
      };
      localStorage.setItem("user_token", JSON.stringify(check_user));
      commit("setCurrentUser", check_user);
    } else {
      return Promise.reject("Wrong Credentials");
    }
  },
  removeCurrentUser: ({ commit }) => {
    localStorage.removeItem("user_token"); // remove dummy token
    commit("clearCurrentUser");
  },
  getWhoToFollow: ({ commit, state }) => {
    let users;
    if (!state.current_user.id) {
      users = state.users;
    } else {
      users = state.users.filter(user => {
        return !state.current_user.following.includes(user.id);
      });
    }
    commit("setWhoToFollow", users.slice(0, 4));
  },
  followUser: ({ commit }, id) => {
    commit("addFollowedUser", id);
  },
  unfollowUser: ({ commit }, id) => {
    commit("removeFollowedUser", id);
  }
};
const mutations = {
  setUsers: (state, users) => (state.users = users),
  addUser: (state, user) => state.users.unshift(user),
  setCurrentUser: (state, user) => {
    state.current_user = { ...user };
  },
  clearCurrentUser: state => (state.current_user = {}),
  setWhoToFollow: (state, users) => (state.whoToFollow = users),
  addFollowedUser: (state, id) => state.current_user.following.push(id),
  removeFollowedUser: (state, id) =>
    (state.current_user.following = state.current_user.following.filter(
      item => item != id
    ))
};
// export
export default {
  state,
  getters,
  actions,
  mutations
};
