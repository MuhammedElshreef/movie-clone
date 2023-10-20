<script setup>
import MoblieHero from '../components/MoblieHero.vue'
import HeroBoard from '../components/HeroBoard.vue'
import Footer from '../components/Footer.vue'
import PopularTvShow from '../components/PopularTvShow.vue'
import CurrentlyAiring from '../components/CurrentlyAiringTVShows.vue'
import AiringToday from '../components/TVShowsAiringToday.vue'
import { useTrendingTv } from '../stores/trendingTv'
const trending = useTrendingTv()
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
      <HeroBoard :show="trending.shows[3]" />
      <MoblieHero :show="trending.shows[3]" class="lg:hidden" />
    </div>
    <PopularTvShow />
    <CurrentlyAiring />
    <AiringToday />
    <Footer />
  </div>
</template>
