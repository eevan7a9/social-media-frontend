import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/post/:id',
      name: 'postdetails',
      component: () => import('./components/posts/PostDetails.vue'),
      props(route) { // by doing this we can prevent the params.id Type 
        let props = { ...route.params } // from changing when entered from url
        props.id = parseInt(props.id)
        return props
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: "/register",
      name: "register",
      component: () => import('./views/Register.vue'),
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: () => import('./views/SignIn.vue'),
    }
  ]
})
