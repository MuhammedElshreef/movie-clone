<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import DesktopCarousel from './DesktopCarousel.vue';
import MobileCarousel from './MobileCarousel.vue';
import { useUpcomingMovies } from '../stores/upcomingMovies'
const upcomingMovies = useUpcomingMovies()
</script>
<template>
  <div v-motion-fade>
  <h2 class="py-8 pl-[1rem] lg:pl-[2rem] lg:text-3xl text-xl text-white">Upcoming Movies</h2>
    <DesktopCarousel :show="upcomingMovies.shows" class="hidden lg:block" :type="'movie'"
      :category="'upcoming'"/>    
    <MobileCarousel :show="upcomingMovies.shows" class="lg:hidden" :type="'movie'"
      :category="'upcoming'" />
  </div>
</template>
