<script setup>
import { ref } from 'vue'
import { useTrending } from '../stores/trending'
import TrailerModal from '../components/TrailerModal.vue'
const trending = useTrending()
const randomTrendingMovie = ref()
const random = Math.floor(Math.random() * trending.items.length)
setTimeout(() => {
  randomTrendingMovie.value = trending.items[random]
  console.log(randomTrendingMovie.value)
}, 100)
</script>
<template>
  <div class="lg:pl-[5rem] flex flex-col">
    <div class="flex">
      <div
        v-show="!randomTrendingMovie"
        class="h-[450px] w-full flex justify-center items-center bg-black"
      >
        <div
          class="inline-block h-20 w-20 animate-spin rounded-full border-4 border-[#1E89DE] border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
        ></div>
      </div>
      <div
        v-show="randomTrendingMovie"
        class="bg-black text-white flex flex-col justify-center px-12 w-1/2"
      >
        <div class="absolute w-[40%] z-[1100] flex flex-col gap-12">
          <p class="text-4xl">{{ randomTrendingMovie.title }} {{ randomTrendingMovie.name }}</p>

          <p class="text-base">{{ randomTrendingMovie.overview }}</p>
          <TrailerModal
            :showId="randomTrendingMovie.id"
            :showType="randomTrendingMovie.media_type"
          />
        </div>
      </div>
      <div class="w-[73%] relative">
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
  </div>
</template>
