import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },

    {
      path: '/movie',
      name: 'movie',
      component: () => import('../views/MoviePage.vue')
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
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchPage.vue')
    },
    {
      path: '/tv/:id',
      name: 'tvDetails',
      component: () => import('../views/TvDetails.vue'),
      children: [
        {
          path: '',
          name: 'tvOverview',
          component: () => import('../components/TvOverView.vue')
        },
        {
          path: 'episodes',
          name: 'tvEpisodes',
          component: () => import('../components/EpisodesPage.vue')
        },
        {
          path: 'photos',
          name: 'tvPhotos',
          component: () => import('../components/PhotosPage.vue')
        }
      ]
    },
    {
      path: '/movie/:id',
      name: 'movieDetails',
      component: () => import('../views/MovieDetails.vue'),
      children: [
        {
          path: '',
          name: 'movieOverview',
          component: () => import('../components/OverviewMovie.vue')
        },
        {
          path: 'photos',
          name: 'moviePhotos',
          component: () => import('../components/PhotosPage.vue')
        }
      ]
    },
    {
      path: '/person/:id',
      name: 'personDetails',
      component: () => import('../views/PersonDetails.vue')
    },
    {
      path: '/movie/trending',
      name: 'trendingMovies',
      component: () => import('../views/MoreTrendingMovie.vue')
    },
    {
      path: '/movie/Popular',
      name: 'popularMovies',
      component: () => import('../views/MorePopularMovies.vue')
    },
    {
      path: '/movie/topRated',
      name: 'topRatedMovies',
      component: () => import('../views/MoreTopRatedMovies.vue')
    },
    {
      path: '/movie/upcoming',
      name: 'upcomingMovies',
      component: () => import('../views/MoreUpcomingMovies.vue')
    },
    {
      path: '/movie/nowPlaying',
      name: 'nowPlayingMovies',
      component: () => import('../views/MoreNowPlayingMovies.vue')
    },
    {
      path: '/tv/trending',
      name: 'trendingTv',
      component: () => import('../views/MoreTrendingTv.vue')
    },
    {
      path: '/tv/popular',
      name: 'PopularTv',
      component: () => import('../views/MorePopularTv.vue')
    },
    {
      path: '/tv/currentlyAiring',
      name: 'currentlyAiringTv',
      component: () => import('../views/MoreCurrentlyPlayingTv.vue')
    },
    {
      path: '/tv/topRated',
      name: 'topRatedTv',
      component: () => import('../views/MoreTopRatedTv.vue')
    },
    {
      path: '/tv/airingToday',
      name: 'airingTodayTv',
      component: () => import('../views/MoreAiringTodayTv.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundPage.vue')
    }
  ]
})

export default router
