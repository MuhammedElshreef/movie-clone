<script setup>
import DesktopCarousel from './DesktopCarousel.vue'
import MobileCarousel from './MobileCarousel.vue'
import { useTrendingMovie } from '../stores/trendingMovie'
const trendingMovie = useTrendingMovie()
</script>
<template>
  <div v-motion-fade-once>
    <h2 class="py-8 pl-[1rem] lg:pl-[2rem] lg:text-3xl text-xl text-white">Trending Movies</h2>
    <DesktopCarousel
      :show="trendingMovie.shows"
      class="hidden lg:block"
      :type="'movie'"
      :category="'trending'"
    />
    <MobileCarousel
      :show="trendingMovie.shows"
      class="lg:hidden"
      :type="'movie'"
      :category="'trending'"
    />
  </div>
</template>
