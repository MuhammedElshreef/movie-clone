<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
const numberOfEp = ref(0)
const episodes = ref([])
const hasEpisodes = ref(null)
const isLoading = ref(true)

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
      isLoading.value = false
      hasEpisodes.value = true
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
    <div role="status" class="flex items-center justify-center py-24" v-if="isLoading">
      <svg
        aria-hidden="true"
        class="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
    <div class="grid gap-2 lg:grid-cols-4 gap-x-4 gap-y-6" v-if="hasEpisodes">
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
    <div class="flex justify-center items-center min-h-[200px]" v-else-if="hasEpisodes == false">
      <p class="text-4xl text-white">No Episodes Found</p>
    </div>
  </div>
</template>
