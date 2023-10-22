<script setup>
import DesktopCarousel from './DesktopCarousel.vue';
import MobileCarousel from './MobileCarousel.vue';
import { useTrendingTv } from '../stores/trendingTv'
const trendingTv = useTrendingTv()
</script>
<template>
  <div >
    <h2 class="py-8 pl-[1rem] lg:pl-[2rem] lg:text-3xl text-xl text-white">Trending Tv Shows</h2>
    <DesktopCarousel :show="trendingTv.shows" class="hidden lg:block"/>  
    <MobileCarousel :show="trendingTv.shows" class="lg:hidden"/>  
  </div>
</template>