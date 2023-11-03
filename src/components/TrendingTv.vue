<script setup>
import DesktopCarousel from './DesktopCarousel.vue'
import MobileCarousel from './MobileCarousel.vue'
import { useTrendingTv } from '../stores/trendingTv'
const trendingTv = useTrendingTv()
</script>
<template>
  <div v-motion-fade>
    <h2 class="py-8 pl-[1rem] lg:pl-[2rem] lg:text-3xl text-xl text-white">Trending Tv Shows</h2>
    <DesktopCarousel :show="trendingTv.shows" class="hidden lg:block" :type="'tv'" :category="'trending'" />
    <MobileCarousel :show="trendingTv.shows" class="lg:hidden" :type="'tv'"
      :category="'trending'" />
  </div>
</template>
