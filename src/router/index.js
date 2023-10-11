import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/tv',
      name: 'tv',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TvPage.vue')
    },
    {
      path: '/movie',
      name: 'movie',
      component: () => import('../views/MoviePage.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchPage.vue')
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: () => import('../views/FavoritePage.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundPage.vue')
    }
  ]
})

export default router
