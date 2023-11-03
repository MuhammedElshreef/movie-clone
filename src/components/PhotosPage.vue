<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const backDrops = ref([])
const posters = ref([])
function getData(id) {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/tv/${id}/images`,
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWY1Yjg3ZDRkODE3MzYwMzgxODljOGE4MDVkODkzNCIsInN1YiI6IjY1MjMxYmI1YzUwYWQyMDEwYjAyYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLGIE_b5QnQP7EBbdIsN3QVeZCaB2n0zaiES6gXC_G8'
    }
  }

  axios
    .request(options)
    .then(function (response) {
      backDrops.value = response.data.backdrops
      posters.value = response.data.posters
    })
    .catch(function (error) {
      console.error(error)
    })
}
onMounted(() => {
  getData(route.params.id)
})
</script>
<template>
  <div class="lg:px-[3rem] px-[1rem] flex flex-col gap-12" v-motion-fade>
    <div class="flex flex-col gap-6" v-if="backDrops.length >= 1">
      <div class="flex gap-4 text-white text-3xl">
        <span>Backdrops </span>
        <span class="text-gray-500 text-base self-end">{{ backDrops.length }} Images</span>
      </div>
      <div class="grid lg:grid-cols-4 grid-cols-2 gap-2">
        <div v-for="(backdrop, index) in backDrops" :key="index">
          <img :src="`https://image.tmdb.org/t/p/w500${backdrop.file_path}`" alt="backdrops images"/>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-6" v-if="posters.length >= 1" v-motion-fade-once>
      <div class="flex gap-4 text-white text-3xl">
        <span>Posters </span>
        <span class="text-gray-500 text-base self-end">{{ posters.length }} Images</span>
      </div>
      <div class="grid lg:grid-cols-5 grid-cols-3 gap-2">
        <div v-for="(poster, index) in posters" :key="index">
          <img
            :src="`https://image.tmdb.org/t/p/w500${poster.file_path}`"
            class="h-[372px] w-[248px]"
            alt="posters images"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center h-36" v-else>
      <p class="text-3xl text-white">No Photos Found</p>
    </div>
  </div>
</template>
