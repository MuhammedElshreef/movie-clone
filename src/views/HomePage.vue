<script setup>
import { ref } from 'vue'
import { useTrending } from '../stores/trending'
import HeroBoard from '../components/HeroBoard.vue'
import trendingMovie from '../components/trendingMovie.vue'
import TrendingTv from '../components/TrendingTv.vue'
import Footer from '../components/Footer.vue'
const trending = useTrending()
</script>
<template>
  <div class="lg:pl-[5rem] flex flex-col">
    <div class="flex">
      <div
        v-show="!randomTrendingMovie"
        class="h-[450px] w-full flex justify-center items-center bg-black"
      >
        <div
          class="inline-block h-20 w-20 animate-spin rounded-full border-4 border-[#1E89DE] border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
        ></div>
      </div>
    </div>
    <div>
      <HeroBoard :show="trending.shows[0]" />
    </div>
    <trendingMovie />
    <TrendingTv />
    <Footer />
  </div>
</template>
