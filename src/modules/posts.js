import axios from "axios";
import router from "@/routes/router";

const state = {
  posts: [],
  showAll: true,
  postDetails: {},
  myPosts: []
};
const getters = {
  allPosts: (state, getters, rootState) => {
    if (state.showAll) {
      return state.posts;
    } else {
      return state.posts.filter(post =>
        rootState.users.current_user.following.includes(post.user_id)
      );
    }
  },
  singlePost: state => state.postDetails,
  ownedPosts: state => state.myPosts,
  showingAll: state => state.showAll,
  recommendedPosts: state => state.posts.slice(-5)
};
const actions = {
  getPosts: async ({ commit, rootState }) => {
    try {
      const res = await axios.get("/posts");
      const likes = rootState.likes.likes; // we access the state of likes module
      const comments = rootState.comments.comments; // we access the state of comments module
      const users = rootState.users.users; // we access the state of users module
      const posts = res.data; // we store the result of our api request
      posts.forEach(post => {
        // we get the user owner of the post
        const foundUser = users.find(user => user.id === post.user_id);
        post.user_username = foundUser.username;
        post.comments = comments.filter(
          comment => comment.post_id === post.id // we check if comments belong to the post
        ).length; // we get the number of comments belong to the post
        post.likes = likes.filter(like => like.post_id == post.id);
      });
      commit("setPosts", { posts: posts });
    } catch (error) {
      alert(error);
    }
  },
  addPost: async ({ commit, rootState }, newPost) => {
    try {
      const result = await axios.post("/posts", {
        id: new Date().getTime(),
        user_id: newPost.user_id,
        title: newPost.title,
        created_at: newPost.created_at
      });
      const users = rootState.users.users;
      const comments = rootState.comments.comments;
      const likes = rootState.likes.likes;
      const post = result.data;
      post.user_username = users
        .filter(user => user.id == post.user_id)
        .map(user => user.username)[0];
      post.comments = comments.filter(
        comment => comment.post_id == post.id
      ).length;
      post.likes = likes.filter(like => like.post_id == post.id);
      commit("insertPost", post);
    } catch (error) {
      alert(error);
    }
  },
  editPost: async ({ commit }, post) => {
    const date = new Date();
    const this_month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const date_day =
      date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    try {
      await axios.put(`/posts/${post.id}`, {
        user_id: post.user_id,
        title: post.title,
        created_at: `${date.getFullYear()}/${this_month}/${date_day}`
      });
      post.created_at = `${date.getFullYear()}/${this_month}/${date_day}`;
      commit("updatePost", post);
    } catch (err) {
      // error 404 will appear because we using fake server
      // to fix this, we catch the error and procceed to update
      post.created_at = `${date.getFullYear()}/${this_month}/${date_day}`;
      commit("updatePost", post);
    }
  },
  deletePost: async ({ commit }, id) => {
    commit("removePost", id);
  },
  viewPost: ({ state, commit, rootState }, id) => {
    const post = state.posts.find(post => post.id == id);
    if (post) {
      const users = rootState.users.users;
      const comments = rootState.comments.comments;
      const likes = rootState.likes.likes;
      const foundUser = users.find(user => user.id == post.user_id);
      post.user_username = foundUser.username;
      post.comments = comments.filter(
        comment => comment.post_id == post.id
      ).length;
      post.likes = likes.filter(like => like.post_id == post.id);
      commit("setPostDetails", post);
    } else {
      router.push({ name: "home" });
    }
  },

  //   Users Posts
  getMyPosts: ({ commit, state }, user_id) => {
    const myPosts = state.posts.filter(post => post.user_id == user_id);

    commit("setMyPosts", myPosts);
    return myPosts;
  },

  //  Post with  Comments & Likes

  addPostComment({ commit, state }) {
    const post = state.postDetails;
    commit("increasePostComment", post);
  },
  subtractPostComment({ commit, state }) {
    const post = state.postDetails;
    commit("decreasePostComment", post);
  },
  addPostLikes: ({ commit }, like) => commit("increasePostLikes", like),
  subtractPostLikes: ({ commit }, like) => commit("decreasePostLikes", like),

  // Sorts Posts

  sortOldest: ({ commit }) => commit("setOldestPost"),
  sortNewest: ({ commit }) => commit("setNewestPost"),

  // Filter Posts

  showFollowedPosts: ({ commit, state }) => {
    const posts = state.posts;
    commit("setPosts", { posts: posts, followed: true });
  }
};
const mutations = {
  setPosts: (state, { posts, followed = false }) => {
    followed ? (state.showAll = false) : (state.showAll = true);
    state.posts = posts;
  },
  insertPost: (state, post) => state.posts.unshift(post),
  updatePost: (state, updated_post) =>
    state.posts.forEach(post =>
      post.id == updated_post.id ? (post = updated_post) : post
    ),
  removePost: (state, id) =>
    (state.posts = state.posts.filter(post => post.id != id)),
  setPostDetails: (state, postDetails) => (state.postDetails = postDetails),
  setMyPosts: (state, posts) => (state.myPosts = posts),
  increasePostComment: (state, updated_post) => {
    state.posts.forEach(post => {
      if (post.id == updated_post.id) {
        post.comments++;
      }
    });
    state.postDetails.comments + 1;
  },
  decreasePostComment: (state, updated_post) => {
    state.posts.forEach(post => {
      if (post.id === updated_post.id) {
        post.comments--;
      }
    });
    state.postDetails.comments - 1;
  },
  increasePostLikes: (state, like) =>
    state.posts.forEach(post =>
      post.id == like.post_id ? post.likes.unshift(like) : post.likes
    ),
  decreasePostLikes: (state, remove_like) =>
    state.posts.forEach(post => {
      if (post.id == remove_like.post_id) {
        post.likes = post.likes.filter(like => like.id != remove_like.id);
      }
    }),
  setOldestPost: state => {
    state.posts.sort((a, b) => {
      let c = new Date(a.created_at).getTime();
      let d = new Date(b.created_at).getTime();
      return c - d;
    });
  },
  setNewestPost: state => {
    state.posts.sort((a, b) => {
      let c = new Date(a.created_at).getTime();
      let d = new Date(b.created_at).getTime();
      return d - c;
    });
  }
};
// export
export default {
  state,
  getters,
  actions,
  mutations
};
