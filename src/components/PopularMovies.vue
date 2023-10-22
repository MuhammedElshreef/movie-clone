<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import DesktopCarousel from './DesktopCarousel.vue'
import MobileCarousel from './MobileCarousel.vue'
import { usePopularMovie } from '../stores/popularMovie'
const popularMovie = usePopularMovie()
</script>
<template>
  <div v-motion-fade>
    <h2 class="py-8 pl-[1rem] lg:pl-[2rem] lg:text-3xl text-xl text-white">Popular Movies</h2>
    <DesktopCarousel :show="popularMovie.shows" class="hidden lg:block" />
    <MobileCarousel :show="popularMovie.shows" class="lg:hidden" />
  </div>
</template>
