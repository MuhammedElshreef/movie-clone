<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import DesktopCarousel from './DesktopCarousel.vue'
import MobileCarousel from './MobileCarousel.vue'
import { useAiringToday } from '../stores/airingTodayTv'
const airingToday = useAiringToday()
</script>
<template>
  <div v-motion-fade-visible-once>
    <h2 class="py-8 pl-[1rem] lg:pl-[2rem] lg:text-3xl text-xl text-white">
      TV Shows Airing Today
    </h2>
    <DesktopCarousel
      :show="airingToday.shows"
      class="hidden lg:block"
      :type="'tv'"
      :category="'airingToday'"
    />
    <MobileCarousel
      :show="airingToday.shows"
      class="lg:hidden"
      :type="'tv'"
      :category="'airingToday'"
    />
  </div>
</template>
