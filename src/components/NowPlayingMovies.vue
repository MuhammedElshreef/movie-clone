<script setup>
import DesktopCarousel from './DesktopCarousel.vue';
import MobileCarousel from './MobileCarousel.vue';
import { useNowPlayingMovies } from '../stores/nowPlayingMovies'
const nowPlayingMovies = useNowPlayingMovies()
</script>
<template>
  <div >
    <h2 class="py-8  pl-[1rem] lg:pl-[2rem] lg:text-3xl text-xl text-white">Now Playing Movies</h2>
    <DesktopCarousel :show="nowPlayingMovies.shows" class="hidden lg:block"/>  
    <MobileCarousel :show="nowPlayingMovies.shows" class="lg:hidden"/>  
  </div>
</template>

