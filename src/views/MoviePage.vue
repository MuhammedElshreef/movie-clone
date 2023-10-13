<script setup>
import { useTrendingMovie } from '../stores/trendingMovie'
import HeroBoard from '../components/HeroBoard.vue'
import PopularMovie from '../components/PopularMovies.vue'
import TopRatedMovies from '../components/TopRatedMovies.vue'
import Footer from '../components/Footer.vue'
import UpComing from '../components/UpcomingMovies.vue'
import NowPlayingMovies from '../components/NowPlayingMovies.vue'
const trending = useTrendingMovie()
</script>
<template>
  <div class="lg:pl-[5rem] flex flex-col">
    <div class="flex">
      <div
        v-show="!trending.shows"
        class="h-[450px] w-full flex justify-center items-center bg-black"
      >
        <div
          class="inline-block h-20 w-20 animate-spin rounded-full border-4 border-[#1E89DE] border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
        ></div>
      </div>
    </div>
    <div>
      <HeroBoard :show="trending.shows[4]" />
    </div>
    <PopularMovie />
    <TopRatedMovies />
    <UpComing />
    <NowPlayingMovies />
    <Footer />
  </div>
</template>
