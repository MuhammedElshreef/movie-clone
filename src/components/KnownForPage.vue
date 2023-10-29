<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import RatingStars from './RatingStars.vue'
const router = useRouter()
const route = useRoute()
const credits = ref([])
function details(type, id) {
  router.push({ path: `/${type}/${id}` })
}
function getData(id) {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`,
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWY1Yjg3ZDRkODE3MzYwMzgxODljOGE4MDVkODkzNCIsInN1YiI6IjY1MjMxYmI1YzUwYWQyMDEwYjAyYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLGIE_b5QnQP7EBbdIsN3QVeZCaB2n0zaiES6gXC_G8'
    }
  }

  axios
    .request(options)
    .then(function (response) {
      credits.value = response.data.cast
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
  <div class="lg:px-[3rem] px-[1rem] grid lg:grid-cols-5 grid-cols-2 gap-4" v-motion-fade>
    <div v-for="credit in credits" :key="credit.id">
      <div
        class="flex flex-col gap-2 group hover:cursor-pointer"
        @click="details(credit.media_type, credit.id)"
      >
        <img
          v-if="credit.poster_path"
          :src="`https://image.tmdb.org/t/p/w500${credit.poster_path}`"
          class="h-[372px] w-[248px] transition ease-in-out group-hover:-translate-y-1 group-hover:scale-105 duration-300"
          alt=""
          loading="lazy"
        />
        <div
          v-else
          class="flex justify-center items-center h-[372px] bg-[#202124] transition ease-in-out group-hover:-translate-y-1 group-hover:scale-105 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#cbd5e1"
            class="w-14 h-14"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>
        <span class="truncate lg:block hidden">{{ credit.title }} {{ credit.name }}</span>
        <div class="lg:flex gap-4 hidden">
          <RatingStars :rating="credit.vote_average" />
          <span class="text-gray-500 pt-1">{{ credit.vote_average / 2 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
