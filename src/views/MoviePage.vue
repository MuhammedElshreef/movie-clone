<script setup>
import { getCurrentInstance, watch, ref, onMounted } from 'vue'
import MoblieHero from '../components/MoblieHero.vue'
import HeroBoard from '../components/HeroBoard.vue'
import PopularMovie from '../components/PopularMovies.vue'
import TopRatedMovies from '../components/TopRatedMovies.vue'
import Footer from '../components/Footer.vue'
import UpComing from '../components/UpcomingMovies.vue'
import NowPlayingMovies from '../components/NowPlayingMovies.vue'
import { useTrendingMovie } from '../stores/trendingMovie'
const trending = useTrendingMovie()
const internalInstance = getCurrentInstance()
internalInstance.appContext.config.globalProperties.$Progress.start()
const ready = ref(null)
onMounted(() => {
  if (trending.shows.length >= 1) {
    ready.value = true
    setTimeout(() => {
      internalInstance.appContext.config.globalProperties.$Progress.finish()
    }, 100)
  } else {
    watch(trending.shows, () => {
      if (trending.shows.length >= 1) {
        internalInstance.appContext.config.globalProperties.$Progress.finish()
        ready.value = true
      } else {
        internalInstance.appContext.config.globalProperties.$Progress.fail()
        ready.value = false
      }
    })
  }
})
</script>
<template>
  <div class="flex flex-col">
    <div class="min-h-screen flex justify-center items-center" v-if="ready == false">
      <p class="lg:text-4xl text-2xl text-white">Failed to load data</p>
    </div>
    <div class="lg:pl-[5rem]" v-if="ready == true" v-motion-fade>
      <div v-once>
        <HeroBoard :show="trending.shows[3]" />
        <MoblieHero :show="trending.shows[3]" class="lg:hidden" />
      </div>
      <div v-motion-fade v-once>
        <PopularMovie />
        <TopRatedMovies />
        <UpComing />
        <NowPlayingMovies />
        <Footer />
      </div>
    </div>
  </div>
</template>
