<script setup>
import DesktopCarousel from './DesktopCarousel.vue'
import MobileCarousel from './MobileCarousel.vue'
import { useTrendingMovie } from '../stores/trendingMovie'
const trendingMovie = useTrendingMovie()
</script>
<template>
  <div v-motion-fade>
    <h2 class="py-8 pl-[1rem] lg:pl-[2rem] lg:text-3xl text-xl text-white">Trending Movies</h2>
    <DesktopCarousel :show="trendingMovie.shows" class="hidden lg:block" />
    <MobileCarousel :show="trendingMovie.shows" class="lg:hidden" />
  </div>
</template>
