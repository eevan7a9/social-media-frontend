import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/style.css"
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // check the meta of routes record and see if they required Auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //  we get if there is a current user from users module's state
    if (Object.keys(store.getters.currentUser).length === 0) {
      next({
        path: '/sign-in',
        query: {redirect:to.fullPath}
      });
    } else {
      next();
    }
  }else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (Object.keys(store.getters.currentUser).length > 0) {
      next({
        path:"/",
        query:{
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();  
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
