import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/post/:id",
      name: "postDetails",
      component: () => import("@/views/PostDetails.vue"),
      props(route) {
        // by doing this we can prevent the params.id Type
        let props = { ...route.params }; // from changing when entered from url
        props.id = parseInt(props.id);
        return props;
      }
    },
    {
      path: "/user/:id",
      name: "user",
      component: () => import("@/views/UserDetails.vue"),
      props(route) {
        let props = { ...route.params };
        props.id = parseInt(props.id);
        return props;
      }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/About.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Register.vue"),
      meta: { requiresVisitor: true }
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: () => import("@/views/SignIn.vue"),
      meta: { requiresVisitor: true }
    },
    {
      name: "sign-out",
      path: "/sign-out",
      component: () => import("@/views/SignOut.vue"),
      meta: { requiresAuth: true }
    }
  ]
});
