<script setup>
import DesktopCarousel from './DesktopCarousel.vue'
import MobileCarousel from './MobileCarousel.vue'
import { useTopRatedShows } from '../stores/topRatedShows'
const topRatedShows = useTopRatedShows()
</script>
<template>
  <div v-motion-fade>
    <h2 class="py-8 pl-[1rem] lg:pl-[2rem] lg:text-3xl text-xl text-white">Top Rated TV Shows</h2>

    <DesktopCarousel :show="topRatedShows.shows" class="hidden lg:block" />
    <MobileCarousel :show="topRatedShows.shows" class="lg:hidden" />
  </div>
</template>
