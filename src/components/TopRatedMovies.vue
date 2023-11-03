<script setup>
import DesktopCarousel from './DesktopCarousel.vue'
import MobileCarousel from './MobileCarousel.vue'
import { useTopRatedMovie } from '../stores/topRatedMovie'
const topRatedMovie = useTopRatedMovie()
</script>
<template>
  <div v-motion-fade>
    <h2 class="py-8 pl-[1rem] lg:pl-[2rem] lg:text-3xl text-xl text-white">Top Rated Movies</h2>
    <DesktopCarousel :show="topRatedMovie.shows" class="hidden lg:block" :type="'movie'"
      :category="'topRated'"/>
    <MobileCarousel :show="topRatedMovie.shows" class="lg:hidden" :type="'movie'"
      :category="'topRated'"/>
  </div>
</template>
