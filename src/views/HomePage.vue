<script setup>
import { onMounted, getCurrentInstance, ref } from 'vue'
import HeroBoard from '../components/HeroBoard.vue'
import MoblieHero from '../components/MoblieHero.vue'
import trendingMovie from '../components/trendingMovie.vue'
import TrendingTv from '../components/TrendingTv.vue'
import Footer from '../components/Footer.vue'
import { useTrending } from '../stores/trending'
const trending = useTrending()
const internalInstance = getCurrentInstance()
internalInstance.appContext.config.globalProperties.$Progress.start()
const ready = ref(null)
onMounted(() => {
  setTimeout(() => {
    if (trending.shows.length >= 1) {
      internalInstance.appContext.config.globalProperties.$Progress.finish()
      ready.value = true
    } else {
      internalInstance.appContext.config.globalProperties.$Progress.fail()
      ready.value = false
    }
  }, 100)
})
</script>
<template>
  <div class="flex flex-col">
    <div class="min-h-screen flex justify-center items-center" v-if="ready == false">
      <p class=";g:text-4xl text-2xl text-white">Failed to load data</p>
    </div>
    <div class="lg:pl-[5rem]" v-if="ready == true">
      <div>
        <HeroBoard :show="trending.shows[0]" class="hidden lg:block" />
        <MoblieHero :show="trending.shows[0]" class="lg:hidden" />
      </div>
      <trendingMovie />
      <TrendingTv />
      <Footer />
    </div>
  </div>
</template>
