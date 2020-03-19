import router from "./router";
import store from "@/store";
router.beforeEach((to, from, next) => {
  // check the meta of routes record and see if they required Auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //  we get if there is a current user from users module's state
    if (!store.getters.currentUser.token) {
      next({
        path: "/sign-in",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // if user is signed-in redirect to home
    if (store.getters.currentUser.token) {
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // user is not signed-in so we procceed
      next();
    }
  } else {
    next();
  }
});
