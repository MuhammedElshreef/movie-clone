<script setup>
import { ref, getCurrentInstance, watch, onMounted } from 'vue'
import TopRatedShows from '../components/TopRatedShows.vue'
import MoblieHero from '../components/MoblieHero.vue'
import HeroBoard from '../components/HeroBoard.vue'
import Footer from '../components/Footer.vue'
import PopularTvShow from '../components/PopularTvShow.vue'
import CurrentlyAiring from '../components/CurrentlyAiringTVShows.vue'
import AiringToday from '../components/TVShowsAiringToday.vue'
import { useTrendingTv } from '../stores/trendingTv'
const trending = useTrendingTv()
const internalInstance = getCurrentInstance()
internalInstance.appContext.config.globalProperties.$Progress.start()
const ready = ref(null)

onMounted(() => {
  if (trending.shows.length >= 1) {
    ready.value = true
    if (trending.shows.length >= 1) {
      internalInstance.appContext.config.globalProperties.$Progress.finish()
    }
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
      <PopularTvShow v-once/>
      <TopRatedShows v-once/>
      <CurrentlyAiring v-once/>
      <AiringToday v-once/>
      <Footer v-once/>
    </div>
  </div>
</template>
