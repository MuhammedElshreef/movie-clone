<script setup>
import axios from 'axios'
import RatingStars from '../components/RatingStars.vue'
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue'
const route = useRoute()
const shows = ref([])
const totalPages = ref()
const options = {
  method: 'GET',
  url: `https://api.themoviedb.org/3/search/multi?query=${route.query.q}&include_adult=false&language=en-US&page=1`,
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWY1Yjg3ZDRkODE3MzYwMzgxODljOGE4MDVkODkzNCIsInN1YiI6IjY1MjMxYmI1YzUwYWQyMDEwYjAyYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLGIE_b5QnQP7EBbdIsN3QVeZCaB2n0zaiES6gXC_G8'
  }
}

axios
  .request(options)
  .then((res) => {
    ;(shows.value = res.data.results), (totalPages.value = res.data.total_pages)
  })
  .catch(function (error) {
    console.error(error)
  })
watch(route, () => {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/multi?query=${route.query.q}&include_adult=false&language=en-US&page=1`,
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWY1Yjg3ZDRkODE3MzYwMzgxODljOGE4MDVkODkzNCIsInN1YiI6IjY1MjMxYmI1YzUwYWQyMDEwYjAyYjFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLGIE_b5QnQP7EBbdIsN3QVeZCaB2n0zaiES6gXC_G8'
    }
  }

  axios
    .request(options)
    .then((res) => {
      ;(shows.value = res.data.results),
        (totalPages.value = res.data.total_pages),
        console.log(shows.value)
    })
    .catch(function (error) {
      console.error(error)
    })
})
</script>
<template>
  <div class="min-h-screen lg:pl-[8rem] pt-[8rem] lg:text-4xl text-2xl text-gray-200">
    <div class="flex flex-col lg:pr-[4rem] px-2">
      <p class="">Results For: {{ route.query.q }}</p>
      <div class="grid lg:grid-cols-5 grid-cols-3 lg:gap-4 gap-2 lg:py-6 pt-4 pb-16">
        <div class="flex flex-col gap-2 h-full" v-for="show in shows" :key="show.id">
          <div
            v-if="
              (show.media_type == 'movie' && show.poster_path !== null) ||
              (show.media_type == 'tv' && show.poster_path !== null)
            "
          >
            <img
              :src="`https://image.tmdb.org/t/p/w500${show.poster_path}`"
              class="lg:w-[276px] lg:h-[414px]"
              alt=""
            />
          </div>
          <div v-else-if="show.media_type == 'person' && show.profile_path !== null">
            <img :src="`https://image.tmdb.org/t/p/w500/${show.profile_path}`" alt="" />
          </div>
          <div v-else class="flex justify-center items-center h-full bg-[#202124]">
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

          <span class="truncate text-xl lg:block hidden">{{ show.title }} {{ show.name }}</span>
          <div class="hidden gap-4 lg:flex">
            <RatingStars :rating="show.vote_average" />
            <span class="text-gray-500 pt-1 text-lg">{{ show.vote_average / 2 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
