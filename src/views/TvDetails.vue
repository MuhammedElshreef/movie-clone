<script setup>
import { getCurrentInstance, ref, onMounted } from 'vue'
import HeroBoard from '../components/HeroBoard.vue'
import MoblieHero from '../components/MoblieHero.vue'
import Footer from '../components/Footer.vue'
import DetailsNav from '../components/DetailsNav.vue'
import TvOverView from '../components/TvOverView.vue'
import CastersCarousel from '../components/CastersCarousel.vue'
import RecommendationShows from '../components/RecommendationShows.vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
const route = useRoute()
const internalInstance = getCurrentInstance()
internalInstance.appContext.config.globalProperties.$Progress.start()
const ready = ref(null)
const show = ref([])
onMounted(() => {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/tv/${route.params.id}?language=en-US`,
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWY1Yjg3ZDRkODE3MzYwMzgxODljOGE4MDVkODkzNCIsInN1YiI6IjY1MjMxYmI1YzUwYWQyMDEwYjAyYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLGIE_b5QnQP7EBbdIsN3QVeZCaB2n0zaiES6gXC_G8'
    }
  }

  axios
    .request(options)
    .then((res) => {
      show.value = res.data
      internalInstance.appContext.config.globalProperties.$Progress.finish()
      ready.value = true
    })
    .catch(function (error) {
      console.error(error)
      internalInstance.appContext.config.globalProperties.$Progress.fail()
      ready.value = false
    })
})
</script>
<template>
  <div>
    <div class="min-h-screen flex justify-center items-center" v-if="ready == false" v-motion-fade>
      <p class="lg:text-4xl text-2xl text-white">Failed to load data</p>
    </div>
    <div class="lg:pl-[5rem] flex flex-col gap-10" v-if="ready == true" v-motion-fade>
      <div>
        <HeroBoard :show="show" class="hidden lg:block" />
        <MoblieHero :show="show" class="lg:hidden" />
      </div>
      <DetailsNav />
      <TvOverView :show="show" />
      <ShowSocial />
      
      <CastersCarousel v-motion-fade-visible-once />

      <RecommendationShows :showId="route.params.id" :show-type="'tv'" v-motion-fade-visible-once />
      <Footer />
    </div>
  </div>
</template>
