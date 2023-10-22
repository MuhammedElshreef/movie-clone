<script setup>
import { useTrending } from '../stores/trending'
import HeroBoard from '../components/HeroBoard.vue'
import MoblieHero from '../components/MoblieHero.vue'
import trendingMovie from '../components/trendingMovie.vue'
import TrendingTv from '../components/TrendingTv.vue'
import Footer from '../components/Footer.vue'
const trending = useTrending()
</script>
<template>
  <div class="lg:pl-[5rem] flex flex-col">
    <div>
      <HeroBoard :show="trending.shows[0]" class="hidden lg:block" />
      <MoblieHero :show="trending.shows[0]" class="lg:hidden"/>
    </div>
    <trendingMovie />
    <TrendingTv />
    <Footer />
  </div>
</template>
