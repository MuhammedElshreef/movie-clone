<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
const numberOfEp = ref(0)
const episodes = ref([])
const props = defineProps({
  show: Array
})
function getData(id, seasNum) {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/tv/${id}/season/${seasNum}?language=en-US`,
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWY1Yjg3ZDRkODE3MzYwMzgxODljOGE4MDVkODkzNCIsInN1YiI6IjY1MjMxYmI1YzUwYWQyMDEwYjAyYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLGIE_b5QnQP7EBbdIsN3QVeZCaB2n0zaiES6gXC_G8'
    }
  }

  axios
    .request(options)
    .then(function (response) {
      episodes.value = response.data.episodes
      numberOfEp.value = episodes.value.length
    })
    .catch(function (error) {
      console.error(error)
    })
}
const selectedSeason = ref()
watch(selectedSeason, () => {
  getData(props.show.id, selectedSeason.value)
})
onMounted(() => {
  getData(props.show.id, 1)
})
</script>
<template>
  <div v-motion-fade class="lg:px-[3rem] px-[2rem] flex flex-col gap-8">
    <div class="flex gap-2 items-center">
      <select
        v-model="selectedSeason"
        class="w-36 h-8 px-2"
        v-if="props.show.number_of_seasons > 1"
      >
        <option
          v-for="(i, index) in props.show.number_of_seasons"
          :key="i"
          :value="i"
          :selected="index === 1"
        >
          season {{ i }}
        </option>
      </select>
      <span>{{ numberOfEp }} Episodes</span>
    </div>
    <div class="grid lg:grid-cols-4 gap-2" v-if="episodes.length >= 1" v-motion-fade>
      <div
        v-for="ep in episodes"
        :key="ep.id"
        class="flex flex-col gap-4 text-gray-300"
        :class="{ 'h-96 relative': ep.overview != '' }"
      >
        <div class="flex flex-col gap-4">
          <img :src="`https://image.tmdb.org/t/p/w500${ep.still_path}`" class="w-[320px]" alt="" />
          <div class="flex gap-2">
            <span class="text-blue-600">E{{ ep.episode_number }}</span>
            <p>{{ ep.name }}</p>
          </div>
          <p class="text-sm" v-if="ep.overview != ''">{{ ep.overview }}</p>
        </div>
        <p class="text-gray-400" :class="{ 'absolute lg:bottom-4 bottom-2': ep.overview != '' }">
          {{ ep.air_date }}
        </p>
      </div>
    </div>
    <div class="flex justify-center items-center min-h-[200px]" v-else v-motion-fade>
      <p class="text-4xl text-white">No Episodes Found</p>
    </div>
  </div>
</template>
