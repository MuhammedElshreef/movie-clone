<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import DesktopCarousel from './DesktopCarousel.vue'
import MobileCarousel from './MobileCarousel.vue'
import { usePopularTv } from '../stores/popularTv'
const popularTv = usePopularTv()
</script>
<template>
  <div v-motion-fade-once>
    <h2 class="py-8 pl-[1rem] lg:pl-[2rem] lg:text-3xl text-xl text-white">Popular Tv Shows</h2>
    <DesktopCarousel
      :show="popularTv.shows"
      class="hidden lg:block"
      :type="'tv'"
      :category="'popular'"
    />
    <MobileCarousel :show="popularTv.shows" class="lg:hidden" :type="'tv'" :category="'popular'" />
  </div>
</template>
