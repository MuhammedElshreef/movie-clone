<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import DesktopCarousel from './DesktopCarousel.vue'
import MobileCarousel from './MobileCarousel.vue'
import { useCurrentlyAiring } from '../stores/currentlyAiring'
const currentlyAiring = useCurrentlyAiring()
</script>
<template>
  <div v-motion-fade>
    <h2 class="py-8 pl-[1rem] lg:pl-[2rem] lg:text-3xl text-xl text-white">
      Currently Airing TV Shows
    </h2>

    <DesktopCarousel
      :show="currentlyAiring.shows"
      class="hidden lg:block"
      :type="'tv'"
      :category="'currentlyAiring'"
    />
    <MobileCarousel
      :show="currentlyAiring.shows"
      class="lg:hidden"
      :type="'tv'"
      :category="'currentlyAiring'"
    />
  </div>
</template>
