<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
const numberOfEp = ref(0)
const episodes = ref([])
const props = defineProps({
  show: {
    type: Object,
    required: true
  }
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
const selectedSeason = ref(props.show.number_of_seasons ? 1 : null)
watch(selectedSeason, () => {
  getData(props.show.id, selectedSeason.value)
})
onMounted(() => {
  getData(props.show.id, 1)
})

const shortDescription = (text, maxLength = 150) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + '...'
}
</script>
<template>
  <div class="lg:px-[3rem] px-[2rem] flex flex-col gap-8">
    <div class="flex items-center gap-2">
      <select
        v-model="selectedSeason"
        class="h-8 px-2 w-36"
        v-if="props.show.number_of_seasons >= 1"
      >
        <option v-for="i in props.show.number_of_seasons" :key="i" :value="i">
          season {{ i }}
        </option>
      </select>
      <span> {{ numberOfEp }} Episodes</span>
    </div>
    <div class="grid gap-2 lg:grid-cols-4 gap-x-4 gap-y-6" v-if="episodes.length >= 1">
      <div
        v-for="ep in episodes"
        :key="ep.id"
        class="flex flex-col gap-4 text-gray-300"
        :class="{ relative: ep.overview != '' }"
      >
        <div class="flex flex-col gap-4">
          <img
            :src="`https://image.tmdb.org/t/p/w500${ep.still_path}`"
            class="w-[320px]"
            alt="episode image"
          />
          <div class="flex gap-2">
            <span class="text-blue-600">E{{ ep.episode_number }}</span>
            <p>{{ ep.name }}</p>
          </div>
          <p class="text-sm" v-if="ep.overview != ''">{{ shortDescription(ep.overview) }}</p>
        </div>
        <p class="text-gray-400">
          {{ ep.air_date }}
        </p>
      </div>
    </div>
    <div class="flex justify-center items-center min-h-[200px]" v-else>
      <p class="text-4xl text-white">No Episodes Found</p>
    </div>
  </div>
</template>
