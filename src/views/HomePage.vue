<script setup>
import { ref } from 'vue'
import { useTrending } from '../stores/trending'
const trending = useTrending()
const randomTrendingMovie = ref([])
const random = Math.floor(Math.random() * trending.items.length)
setTimeout(() => {
  randomTrendingMovie.value = trending.items[random]
  console.log(randomTrendingMovie.value)
}, 100)
</script>
<template>
  <div class="lg:pl-[5rem] flex">
    <div class="bg-black text-white flex flex-col justify-center px-12 w-1/2">
      <div class="absolute w-[40%] z-20 flex flex-col gap-16">
        <p class="text-4xl">{{ randomTrendingMovie.title }} {{ randomTrendingMovie.name }}</p>

        <p class="text-base">{{ randomTrendingMovie.overview }}</p>
      </div>
    </div>
    <div class="w-[73%] h-full relative">
      <div
        class="absolute w-full h-full"
        style="background-image: linear-gradient(90deg, #000 0, transparent 50%, transparent)"
      ></div>
      <img
        :src="`https://image.tmdb.org/t/p/w500${randomTrendingMovie.backdrop_path}`"
        class="w-full h-full"
        alt=""
      />
    </div>
  </div>
</template>
