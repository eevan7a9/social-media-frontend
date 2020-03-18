const state = {
  isShown: false
};
const getters = {
  showLoader: state => state.isShown
};
const actions = {
  toggleLoader: ({ commit }, status) => {
    commit("setLoader", status);
  }
};
const mutations = {
  setLoader: (state, status) =>
    status ? (state.isShown = true) : (state.isShown = false)
};
export default {
  state,
  getters,
  actions,
  mutations
};
