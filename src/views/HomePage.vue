<script setup>
import { useTrending } from '../stores/trending'
import HeroBoard from '../components/HeroBoard.vue'
import trendingMovie from '../components/trendingMovie.vue'
import TrendingTv from '../components/TrendingTv.vue'
import Footer from '../components/Footer.vue'
const trending = useTrending()
</script>
<template>
  <div class="lg:pl-[5rem] flex flex-col">
    <div>
      <HeroBoard :show="trending.shows[0]" />
    </div>
    <trendingMovie />
    <TrendingTv />
    <Footer />
  </div>
</template>
