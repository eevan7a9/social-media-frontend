import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          name: 'feedDetailView',
          path: 'feed/:id',
          component: () => import('../views/FeedDetailView.vue'),
        },
        {
          name: 'groupDetailView',
          path: 'group/:id',
          component: () => import('../views/GroupDetailView.vue'),
        },
        {
          name: 'storyDetailView',
          path: 'story/:id',
          component: () => import('../views/StoryDetailView.vue'),
        },
      ],
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProfileView.vue'),
      children: [
        {
          name: 'profileFeedDetailView',
          path: 'feed/:id',
          component: () => import('../views/FeedDetailView.vue'),
        },
        {
          name: 'profileGroupDetailView',
          path: 'group/:id',
          component: () => import('../views/GroupDetailView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});

export default router;
