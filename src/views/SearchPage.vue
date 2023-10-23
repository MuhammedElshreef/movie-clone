<script setup>
import axios from 'axios'
import RatingStars from '../components/RatingStars.vue'
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue'
const route = useRoute()
const shows = ref([])

watch(
  route,
  () => {
    setTimeout(() => {
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
        .then((res) => (shows.value = res.data.results))
        .catch(function (error) {
          console.error(error)
        })
      console.log(route.query.q)
    })
  },
  1000
)
</script>
<template>
  <div class="min-h-screen lg:pl-[8rem] pt-[8rem] lg:text-4xl text-2xl text-gray-200">
    <div class="flex flex-col lg:pr-[4rem] px-2">
      <p class="">Results For: {{ route.query.q }}</p>
      <div class="grid lg:grid-cols-5 grid-cols-3 lg:gap-4 gap-2 lg:py-6 pt-4 pb-16">
        <div class="flex flex-col gap-2 h-full" v-for="show in shows" :key="show.id">
          <img
            :src="`https://image.tmdb.org/t/p/w500${show.poster_path}`"
            class="lg:w-[276px] lg:h-[414px]"
            alt=""
          />
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
